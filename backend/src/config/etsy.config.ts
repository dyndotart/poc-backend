const appName = process.env.ETSY_APP_NAME;
const keyString = process.env.ETSY_KEY_STRING;
const sharedSecret = process.env.ETSY_SHARED_SECRET;

export default {
  appName,
  auth: {
    keyString,
    sharedSecret,
    endpoint: 'https://accounts.spotify.com/api/token',
  },
  baseUrl: 'https://openapi.etsy.com/v3/',
};
