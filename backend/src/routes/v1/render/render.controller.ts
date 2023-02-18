import { renderStill } from '@remotion/renderer';
import express from 'express';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { getComposition, getWebpackBundleLocation } from '../../../core/media';
import { getImageType, getMimeType } from '../../../core/media/remotion';
import { hashObject } from '../../../utils/hash-object';
import { sendFile } from '../../../utils/send-file';
import { GetTestParams } from './types';

const TEMP_DIR = fs.promises.mkdtemp(path.join(os.tmpdir(), 'remotion-'));

export async function renderRemotion(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const inputProps = req.query;
  const compName = req.params[GetTestParams.compositionname];
  const imageFormat = getImageType(req.params[GetTestParams.format]);

  res.set('content-type', getMimeType(imageFormat));

  // Calculate a unique identifier for the image
  const hash = hashObject(
    JSON.stringify({
      compName,
      imageFormat,
      inputProps,
    })
  );

  // Render image
  const output = path.join(await TEMP_DIR, hash);
  const webpackBundleLocation = await getWebpackBundleLocation();
  const composition = await getComposition(compName, inputProps);
  await renderStill({
    composition,
    serveUrl: webpackBundleLocation,
    output,
    inputProps,
    imageFormat,
  });

  // Send image to client
  await sendFile(res, fs.createReadStream(output));

  // Cache sent image
  // await saveToCache(hash, await fs.promises.readFile(output));
  await fs.promises.unlink(output);
}
