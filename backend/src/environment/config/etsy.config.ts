import appConfig from './app.config';

const appName = process.env.ETSY_APP_NAME;
const keyString = process.env.ETSY_KEY_STRING;
const sharedSecret = process.env.ETSY_SHARED_SECRET;

export default {
  appName,
  auth: {
    keyString,
    sharedSecret,
    tokenEndpoint: 'https://api.etsy.com/v3/public/oauth/token',
    challengeEndpoint: 'https://www.etsy.com/oauth/connect',
    redirectUrl: `${appConfig.baseUrl}/auth/etsy/oauth/redirect`,
  },
  baseUrl: 'https://openapi.etsy.com/v3',
};
