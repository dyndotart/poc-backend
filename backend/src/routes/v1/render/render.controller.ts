import axios from 'axios';
import express from 'express';
import fs from 'fs';
import { renderByCompositionName } from '../../../core/media';
import { spotifyApi } from '../../../core/services/spotify/api.service';
import { AppError } from '../../../middlewares/error';
import { getImageType, getMimeType } from '../../../utils/image-types';
import { randomNumber } from '../../../utils/random';
import { sendFile } from '../../../utils/send-file';
import { RenderRawParams } from './types';

export async function renderRawController(
  req: express.Request,
  res: express.Response
) {
  const inputProps = req.query;
  const compositionName = req.params[RenderRawParams.compositionname];
  const imageFormat = getImageType(req.params[RenderRawParams.format]);
  if (imageFormat == null)
    throw new AppError(
      400,
      'Invalid image format - your URL path should end in .png or .jpeg!'
    );
  const mimeType = getMimeType(imageFormat);

  // Set up headers
  res.set('content-type', mimeType);

  // Render image
  const { outputPath, clear } = await renderByCompositionName(
    compositionName,
    imageFormat,
    inputProps
  );

  // Send image to client
  await sendFile(res, fs.createReadStream(outputPath));

  // TODO Cache sent image
  // await saveToCache(hash, await fs.promises.readFile(output));

  await clear();
}

export async function renderSpotifyPlayerController(
  req: express.Request,
  res: express.Response
) {
  const inputProps = req.query;
  const imageFormat = getImageType(req.params[RenderRawParams.format]);
  if (imageFormat == null)
    throw new AppError(
      400,
      'Invalid image format - your URL path should end in .png or .jpeg!'
    );
  const trackName = inputProps?.track;
  const artistName = inputProps?.artist;
  if (typeof trackName !== 'string' || typeof artistName !== 'string') {
    throw new AppError(400, 'Invalid track or artist provided!');
  }

  const mimeType = getMimeType(imageFormat);
  const tracks = await spotifyApi.search(trackName, artistName);
  if (tracks.length <= 0) {
    throw new AppError(
      404,
      `No track found at track: '${trackName}', artist: '${artistName}'!`
    );
  }
  const track = tracks[0];

  // Set up headers
  res.set('content-type', mimeType);

  // Render image
  const { outputPath, clear } = await renderByCompositionName(
    'spotify-track-player',
    imageFormat,
    {
      title: trackName,
      subtitle: artistName,
      time: {
        total: track.duration_ms / 1000,
        current: randomNumber(
          track.duration_ms / 1000 / 10,
          track.duration_ms / 1000
        ),
      },
      spotifyCode: true,
      trackId: track.id,
    }
  );

  // Send image to client
  await sendFile(res, fs.createReadStream(outputPath));

  await clear();
}

export async function renderCityMapController(
  req: express.Request,
  res: express.Response
) {
  const minLon = 0.3203751;
  const maxLon = 0.3340155;
  const minLat = 51.2867602;
  const maxLat = 51.2918741;
  const bbox = [minLon, minLat, maxLon, maxLat].join(',');

  // Open Street Map
  // Limited to bound box size of 0.25
  // Limited to 5000 nodes in this boundbox
  // const osmResponse = await axios.get(
  //   `https://api.openstreetmap.org/api/0.6/map?bbox=${bbox}`
  // );
  // const osmData = osmResponse.data;

  // Overpass API
  // https://overpass-turbo.eu/
  const query = `
    [out:json][timeout:90];
    {{geocodeArea:LaPaz}}->.searchArea;
    (
      way["building"](area.searchArea);
      way["highway"](area.searchArea);
    );
    out body;
    >;
    out skel qt;
  `;
  const formData = new URLSearchParams();
  formData.append('data', query);
  const opResponse = await axios.post(
    'https://overpass-api.de/api/interpreter',
    formData,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );
  const opData = opResponse.data;

  // console.log({ osmData, opData });

  // const jsondata = osmtogeojson(xmlData);

  // res.send(jsondata);
  res.send(200);
}
