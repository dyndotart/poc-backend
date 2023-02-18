import axios from 'axios';
import spotifyConfig from '../../../config/spotify.config';

export const api = (() => {
  const clientId = spotifyConfig.auth.clientId;
  const clientSecret = spotifyConfig.auth.clientSecret;
  const authEndpoint = spotifyConfig.auth.endpoint;

  async function getAccessToken(): Promise<string | null> {
    // Base64 encode the client id and client secret
    const authString = `${clientId}:${clientSecret}`;
    const encodedAuthString = Buffer.from(authString).toString('base64');

    // Set up headers
    const headers = {
      Authorization: `Basic ${encodedAuthString}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    // Set up body
    const body = 'grant_type=client_credentials';

    // Sent request
    const response = await axios.post(authEndpoint, body, { headers });

    return response?.data?.access_token ?? null;
  }

  return { getAccessToken };
})();
