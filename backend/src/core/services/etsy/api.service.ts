import axios from 'axios';
import crypto from 'crypto';
import etsyConfig from '../../../environment/config/etsy.config';
import { mapAxiosError } from '../../../utils/map-error';
import {
  TEtsyAuthResponseDto,
  TEtsyPingResponseDto,
  TGetMeResponseDto,
  TGetShopReceiptsDto,
} from './types';

export const etsyApi = (() => {
  const keyString = etsyConfig.auth.keyString;
  const tokenEndpoint = etsyConfig.auth.tokenEndpoint;
  const challengeEndpoint = etsyConfig.auth.challengeEndpoint;
  const apiEndpoint = etsyConfig.baseUrl;
  const redirectUrl = etsyConfig.auth.redirectUrl;

  const codeVerifiers: Record<string, string> = {};

  let accessToken: string | null = null;
  let accessTokenExpiresAt = 0;
  const accessTokenPuffer = 60 * 5; // s

  let refreshToken: string | null = null; // 90 day life span
  let refreshTokenExpiresAt = 0;

  // https://developers.etsy.com/documentation/tutorials/quickstart#test-your-api-key
  async function ping(): Promise<boolean> {
    try {
      // Set up headers
      const headers = {
        'x-api-key': keyString,
      };

      // Send request
      const response = await axios.get<TEtsyPingResponseDto>(
        `${apiEndpoint}/application/openapi-ping`,
        { headers }
      );

      return response.data.application_id != null;
    } catch (e) {
      mapAxiosError(e);
    }
    return false;
  }

  // Etsy doesn't support client_credentials flow: https://github.com/etsy/open-api/issues/146
  // https://developers.etsy.com/documentation/tutorials/quickstart#generate-the-pkce-code-challenge
  function generatePKCECodeChallengeUri(): string {
    const scopes = ['email_r', 'transactions_r', 'transactions_w', 'shops_r'];

    // The next two functions help us generate the code challenge
    // required by Etsy’s OAuth implementation.
    const base64URLEncode = (buffer: Buffer): string =>
      buffer
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');

    const sha256 = (value: string): Buffer =>
      crypto.createHash('sha256').update(value).digest();

    // We’ll use the verifier to generate the challenge.
    // The verifier needs to be saved for a future step in the OAuth flow.
    const codeVerifier = base64URLEncode(crypto.randomBytes(32));

    // With these functions, we can generate
    // the values needed for our OAuth authorization grant.
    const codeChallenge = base64URLEncode(sha256(codeVerifier));
    const state = Math.random().toString(36).substring(7);
    codeVerifiers[state] = codeVerifier;

    return `${challengeEndpoint}
    ?response_type=code
    &redirect_uri=${redirectUrl}
    &scope=${scopes.join('%20')}
    &client_id=${keyString}
    &state=${state}
    &code_challenge=${codeChallenge}
    &code_challenge_method=S256`
      .replace(/\s+/g, '')
      .trim();
  }

  async function getAccessToken(force = false): Promise<string | null> {
    if (accessToken != null && Date.now() < accessTokenExpiresAt && !force) {
      return accessToken;
    }
    if (refreshToken != null && Date.now() < refreshTokenExpiresAt) {
      return await fetchAccessTokenByRefreshToken(refreshToken);
    } else {
      console.error(
        'Refresh Token was expired and the access needs to be regranted via authorization code.'
      );
    }
    return null;
  }

  async function fetchAccessTokenByRefreshToken(
    refreshToken: string
  ): Promise<string | null> {
    try {
      // Set up body
      const body = {
        grant_type: 'refresh_token',
        client_id: keyString,
        refresh_token: refreshToken,
      };

      // Send request
      const response = await axios.post<TEtsyAuthResponseDto>(
        tokenEndpoint,
        body
      );
      const data = response.data;
      if (
        data.access_token == null ||
        data.expires_in == null ||
        data.refresh_token
      )
        return null;

      accessToken = data.access_token;
      accessTokenExpiresAt =
        Date.now() + (data.expires_in - accessTokenPuffer) * 1000;
      if (data.refresh_token !== refreshToken) {
        refreshToken = data.refresh_token;
        refreshTokenExpiresAt = Date.now() + 89 * 24 * 60 * 60 * 1000;
      }

      console.log(
        `Successfully fetched new Etsy Access Token (with Refresh Token) that will expire at ${new Date(
          accessTokenExpiresAt
        ).toLocaleTimeString()}`
      );

      return accessToken;
    } catch (e) {
      mapAxiosError(e);
    }
    return null;
  }

  async function fetchAccessTokenByAuthorizationCode(
    code: string,
    state: string
  ): Promise<string | null> {
    try {
      const codeVerifier = codeVerifiers[state];
      if (codeVerifier == null) {
        console.error('No matching code verifier found!');
        return null;
      }

      // Set up body
      const body = {
        grant_type: 'authorization_code',
        client_id: keyString,
        redirect_uri: redirectUrl,
        code,
        code_verifier: codeVerifier,
      };

      // Send request
      const response = await axios.post<TEtsyAuthResponseDto>(
        tokenEndpoint,
        body
      );
      const data = response.data;
      if (
        data.access_token == null ||
        data.expires_in == null ||
        data.refresh_token == null
      )
        return null;

      accessToken = data.access_token;
      accessTokenExpiresAt =
        Date.now() + (data.expires_in - accessTokenPuffer) * 1000;
      refreshToken = data.refresh_token;
      if (data.refresh_token !== refreshToken) {
        refreshToken = data.refresh_token;
        refreshTokenExpiresAt = Date.now() + 89 * 24 * 60 * 60 * 1000;
      }

      // Remove code verifier as the code can only be used once
      delete codeVerifiers[state];

      console.log(
        `Successfully fetched new Etsy Access Token that will expire at ${new Date(
          accessTokenExpiresAt
        ).toLocaleTimeString()}`
      );

      return accessToken;
    } catch (e) {
      mapAxiosError(e);
    }
    return null;
  }

  async function getMe(): Promise<TGetMeResponseDto | null> {
    try {
      // Set up headers
      const accessToken = await getAccessToken();
      const headers = {
        'x-api-key': keyString,
        Authorization: `Bearer ${accessToken}`,
      };

      // Send request
      const response = await axios.get<TGetMeResponseDto>(
        `${apiEndpoint}/application/users/me`,
        { headers }
      );

      return response?.data;
    } catch (e) {
      mapAxiosError(e);
    }

    return null;
  }

  async function getShopReceipts(shopId: string): Promise<any> {
    try {
      // Set up headers
      const accessToken = await getAccessToken();
      const headers = {
        'x-api-key': keyString,
        Authorization: `Bearer ${accessToken}`,
      };

      // Send request
      const response = await axios.get<TGetShopReceiptsDto>(
        `${apiEndpoint}/application/shops/${shopId}/receipts`,
        { headers }
      );
      const data = response.data;

      console.log({ data });
      return data.results;
    } catch (e) {
      mapAxiosError(e);
    }

    return [];
  }

  return {
    ping,
    generatePKCECodeChallengeUri,
    fetchAccessTokenByAuthorizationCode,
    getMe,
    getShopReceipts,
  };
})();
