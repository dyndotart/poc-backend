import { bundle } from '@remotion/bundler';
import path from 'path';
import { webpackOverride } from '../webpack-override';

const ENTRY = './render/index';

export const { getWebpackBundleLocation, initRemotionSSR } = (() => {
  let webpackBundleLocation: string | null = null;

  async function initRemotionSSR() {
    await getWebpackBundleLocation(true);
  }

  async function getWebpackBundleLocation(reload = false): Promise<string> {
    if (webpackBundleLocation != null && !reload) return webpackBundleLocation;

    // Load Remotion Webpack bundle
    const remotionPath = path.resolve(path.join(__dirname, ENTRY));
    const bundleLocation = await bundle(remotionPath, () => undefined, {
      webpackOverride: (config) => webpackOverride(config),
    });

    console.log(
      `Created new Webpack bundle of remotion renders at '${bundleLocation}'`
    );

    webpackBundleLocation = bundleLocation;
    return bundleLocation;
  }

  return { getWebpackBundleLocation, initRemotionSSR };
})();
