const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

export default {
  auth: {
    clientId,
    clientSecret,
    endpoint: 'https://accounts.spotify.com/api/token',
  },
  baseUrl: 'https://api.spotify.com/v1',
};
