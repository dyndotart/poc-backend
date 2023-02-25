import { getCompositions, renderStill } from '@remotion/renderer';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { appConfig, STAGE } from '../../../environment/config';
import { hashObject } from '../../../utils/hash-object';
import { getWebpackBundleLocation } from './bundler';

async function getCompositionByName(
  compositionName: string,
  inputProps: Record<string, any> = {}
) {
  // Get compositions from webpack bundle
  const webpackBundleLocation = await getWebpackBundleLocation();
  const compositions = await getCompositions(webpackBundleLocation, {
    inputProps,
  });

  // Find composition
  const composition = compositions.find((c) => c.id === compositionName);

  return composition ?? null;
}

export async function renderByCompositionName(
  compositionName: string,
  imageFormat: 'jpeg' | 'png' = 'png',
  inputProps: Record<string, any> = {}
): Promise<{ outputPath: string; clear: () => Promise<void> }> {
  // Calculate a unique identifier for the image
  const hash = hashObject(
    JSON.stringify({
      compositionName,
      imageFormat,
      inputProps,
    })
  );

  const tempDir = await fs.promises.mkdtemp(
    path.join(os.tmpdir(), 'remotion-')
  );
  const outputPath = path.join(tempDir, hash);
  const webpackBundleLocation = await getWebpackBundleLocation();
  const composition = await getCompositionByName(compositionName, inputProps);

  // Render image to 'output' in temp dir
  if (composition != null) {
    await renderStill({
      composition,
      serveUrl: webpackBundleLocation,
      output: outputPath,
      inputProps,
      imageFormat,
      dumpBrowserLogs: [STAGE.DEV, STAGE.LOCAL].includes(appConfig.stage),
    });
  }

  return {
    outputPath,
    clear: async () => {
      // Delete file at output path
      await fs.promises.unlink(outputPath);
    },
  };
}
