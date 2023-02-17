import { bundle } from '@remotion/bundler';
import path from 'path';
import os from 'os';
import fs from 'fs';

const ENTRY = './src/index';
const TEMP_DIR = fs.promises.mkdtemp(path.join(os.tmpdir(), 'remotion-'));

export async function initRemotionSSR(): Promise<string> {
  const bundleLocation = await bundle(path.resolve(ENTRY), () => undefined, {
    // If you have a Webpack override, make sure to add it here
    webpackOverride: (config) => config,
  });

  console.log(
    `Created a Webpack bundle of remotion renders at '${bundleLocation}'`
  );

  return bundleLocation;
}
