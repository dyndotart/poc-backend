import express from 'express';
import { getComposition, getWebpackBundleLocation } from '../../../core/media';
import {
  getImageType,
  getMimeType,
} from '../../../core/media/remotion/image-types';
import { GetTestParams } from './types';
import { renderStill } from '@remotion/renderer';
import path from 'path';
import fs from 'fs';
import os from 'os';
import { sendFile } from '../../../utils/send-file';
import { hashObject } from '../../../utils/hash-object';

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

  await sendFile(res, fs.createReadStream(output));
  // await saveToCache(hash, await fs.promises.readFile(output));
  await fs.promises.unlink(output);
}
