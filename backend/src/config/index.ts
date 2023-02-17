import dotenv from 'dotenv';

// Load environment variables based on Stage
// https://stackoverflow.com/questions/11104028/why-is-process-env-node-env-undefined
dotenv.config({ path: `.env` });

// Import Configs
import appConfig from './app.config';

export const config = {
  app: appConfig,
};

console.log(`Loaded Config based on '.env'`, { config });

export default config;

export * from './types';
