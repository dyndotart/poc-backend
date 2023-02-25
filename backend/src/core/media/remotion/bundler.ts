import { bundle as bundleRemotion } from '@remotion/bundler';
import path from 'path';
import { webpackOverride } from './render/src/webpack-override';

const ENTRY = './render/src/index';

export const { getWebpackBundleLocation, initRemotionSSR } = (() => {
  let webpackBundleLocation: string | null = null;

  async function initRemotionSSR() {
    await getWebpackBundleLocation(true);
  }

  async function getWebpackBundleLocation(reload = false): Promise<string> {
    if (webpackBundleLocation != null && !reload) return webpackBundleLocation;
    return bundle();
  }

  async function bundle(): Promise<string> {
    // Bundle Remotion via Webpack
    const remotionPath = path.resolve(path.join(__dirname, ENTRY));
    const onProgress = (progress: number) => {
      console.log(`Webpack bundling progress: ${progress}%`);
    };
    const bundleLocation = await bundleRemotion({
      entryPoint: remotionPath,
      onProgress,
      webpackOverride: (config: any) => webpackOverride(config),
      enableCaching: true,
    });

    console.log(
      `Created new Webpack bundle of remotion renders at '${bundleLocation}'`
    );

    webpackBundleLocation = bundleLocation;
    return bundleLocation;
  }

  return { getWebpackBundleLocation, initRemotionSSR };
})();
