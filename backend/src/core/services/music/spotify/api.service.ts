import axios from 'axios';
import { musicConfig } from '../../../../environment/config';
import { mapAxiosError } from '../../../../utils/map-error';
import {
  TSpotifyAuthResponseDto,
  TSpotifySearchResponseDto,
  TTrackDto,
} from './types';

export const spotifyApi = (() => {
  const clientId = musicConfig.spotify.auth.clientId;
  const clientSecret = musicConfig.spotify.auth.clientSecret;
  const tokenEndpoint = musicConfig.spotify.auth.tokenEndpoint;
  const apiEndpoint = musicConfig.spotify.baseUrl;

  let accessToken: string | null = null;
  let expiresAt = 0;
  const puffer = 60 * 5; // s

  async function getAccessToken(force = false): Promise<string | null> {
    if (Date.now() < expiresAt && accessToken != null && !force) {
      return accessToken;
    }
    return await fetchAccessToken();
  }

  // Client Credentials Flow
  // https://developer.spotify.com/documentation/general/guides/authorization/client-credentials/
  async function fetchAccessToken(): Promise<string | null> {
    try {
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

      // Send request
      const response = await axios.post<TSpotifyAuthResponseDto>(
        tokenEndpoint,
        body,
        { headers }
      );
      const data = response.data;
      if (data.access_token == null || data.expires_in == null) return null;

      accessToken = data.access_token;
      expiresAt = Date.now() + (data.expires_in - puffer) * 1000;

      console.log(
        `Successfully fetched new Spotify Access Token that will expire at ${new Date(
          expiresAt
        ).toLocaleTimeString()}`
      );

      return accessToken;
    } catch (e) {
      mapAxiosError(e);
    }
    return null;
  }

  async function getSearch(query: string): Promise<TTrackDto[]> {
    try {
      // Set up headers
      const accessToken = await getAccessToken();
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      };

      // Send request
      const response = await axios.get<TSpotifySearchResponseDto>(
        `${apiEndpoint}/search`,
        {
          headers,
          params: {
            q: query,
            type: 'track',
            limit: 5,
          },
        }
      );

      return response.data?.tracks?.items ?? [];
    } catch (e) {
      mapAxiosError(e);
    }

    return [];
  }

  return { getAccessToken, getSearch };
})();
