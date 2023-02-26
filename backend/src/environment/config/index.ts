import dotenv from 'dotenv';

// Load environment variables based on Stage
// https://stackoverflow.com/questions/11104028/why-is-process-env-node-env-undefined
dotenv.config({ path: `.env` });

// Import Configs
import appConfig from './app.config';
import etsyConfig from './etsy.config';
import mapConfig from './map.config';
import musicConfig from './music.config';

export const config = {
  app: appConfig,
  music: musicConfig,
  etsy: etsyConfig,
  map: mapConfig,
};

console.log(`Loaded Config based on '.env'`, { config });

export default config;

export * from './types';
export { appConfig, musicConfig, mapConfig };
