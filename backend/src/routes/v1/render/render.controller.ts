import { VectorTile } from '@mapbox/vector-tile';
import express from 'express';
import fs from 'fs';
import { FeatureCollection } from 'geojson';
import { renderByCompositionName } from '../../../core/media';
import { mapTilerApi } from '../../../core/services/map/maptiler/api.service';
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
  const vectorTileBuffer = await mapTilerApi.getVectorTileAsPBF(165, 396, 10);
  if (vectorTileBuffer == null)
    throw new AppError(500, 'Failed to resolve buffer!');
  const tileMVT = new VectorTile(vectorTileBuffer);
  const geoJson = mvtToGeoJson(tileMVT);

  console.log({ geoJson });

  // const jsondata = osmtogeojson(xmlData);

  // res.send(jsondata);
  res.send(geoJson);
}

function mvtToGeoJson(mvt: VectorTile): Record<string, FeatureCollection> {
  const layers: Record<string, FeatureCollection> = {};

  Object.values(mvt.layers).forEach((layer, i) => {
    const features = Array.from(Array(layer._features.length), (v, i) => {
      return layer.feature(i).toGeoJSON(165, 496, 10);
    });
    layers[layer.name] = {
      type: 'FeatureCollection',
      features,
    };
  });

  return layers;
}
