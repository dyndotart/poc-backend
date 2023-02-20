const appName = process.env.ETSY_APP_NAME;
const keyString = process.env.ETSY_KEY_STRING;
const sharedSecret = process.env.ETSY_SHARED_SECRET;

export default {
  appName,
  auth: {
    keyString,
    sharedSecret,
    endpoint: 'https://api.etsy.com/v3/public/oauth/token',
  },
  baseUrl: 'https://openapi.etsy.com/v3/',
};
