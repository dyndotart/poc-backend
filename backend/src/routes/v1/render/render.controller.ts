import express from 'express';
import fs from 'fs';
import { renderByCompositionName } from '../../../core/media';
import { mapService } from '../../../core/services/map';
import { mapStyles } from '../../../core/services/map/styles';
import { spotifyService } from '../../../core/services/spotify';
import mapConfig from '../../../environment/config/map.config';
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
  const tracks = await spotifyService.searchTrackByName(trackName, artistName);
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
  const geoJsonTile = await mapService.getGeoJsonTile({
    x: 165,
    y: 396,
    z: 10,
  });
  if (geoJsonTile == null) throw new AppError(500, 'Failed query Vector Tile!');

  // Insert maptiler api key into style doc
  const style = mapStyles[0].styles;
  if (style.doc != null) {
    for (const src of style.doc) {
      if (src.url != null) {
        src.url = src.url.replace(/{key}/, mapConfig.mapTiler.apiKey);
      }
    }
  }

  res.send({
    layers: geoJsonTile.layers,
    viewBox: geoJsonTile.viewBox,
  });
}
