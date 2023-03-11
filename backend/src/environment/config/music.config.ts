const spotifyClientId = process.env.MUSIC_SPOTIFY_CLIENT_ID;
const spotifyClientSecret = process.env.MUSIC_SPOTIFY_CLIENT_SECRET;
const geniusClientId = process.env.MUSIC_GENIUS_CLIENT_ID;
const geniusClientSecret = process.env.MUSIC_GENIUS_CLIENT_SECRET;
const geniusAccessToken = process.env.MUSIC_GENIUS_ACCESS_TOKEN;

export default {
  spotify: {
    auth: {
      clientId: spotifyClientId,
      clientSecret: spotifyClientSecret,
      tokenEndpoint: 'https://accounts.spotify.com/api/token',
    },
    baseUrl: 'https://api.spotify.com/v1',
  },
  geniusLyrics: {
    auth: {
      clientId: geniusClientId,
      clientSecret: geniusClientSecret,
      accessToken: geniusAccessToken, // API doesn't support Client Credentials Flow, so I'm directly using the access token that will never expire
      authorizeEndpoint: 'https://api.genius.com/oauth/authorize',
    },
    baseUrl: 'https://api.genius.com',
  },
};
