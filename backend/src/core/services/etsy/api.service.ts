import axios from 'axios';
import crypto from 'crypto';
import etsyConfig from '../../../environment/config/etsy.config';
import { mapAxiosError } from '../../../utils/map-error';
import { TEtsyPingResponseDto } from './types';

export const etsyApi = (() => {
  const keyString = etsyConfig.auth.keyString;
  const tokenEndpoint = etsyConfig.auth.tokenEndpoint;
  const challengeEndpoint = etsyConfig.auth.challengeEndpoint;
  const apiEndpoint = etsyConfig.baseUrl;
  const redirectUrl = etsyConfig.auth.redirectUrl;

  let accessToken: string | null = null;
  let expiresAt = 0;
  const puffer = 60 * 5; // s

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
  function generatePKCECodeChallengeUri(): {
    url: string;
    codeVerifier: string;
  } {
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

    return {
      url: `${challengeEndpoint}?response_type=code&redirect_uri=${redirectUrl}&scope=email_r&client_id=${keyString}&state=${state}&code_challenge=${codeChallenge}&code_challenge_method=S256`,
      codeVerifier,
    };
  }

  async function fetchAccessTokenByAuthorizationCode(
    code: string,
    codeVerifier: string
  ): Promise<string | null> {
    try {
      // Set up headers
      const headers = {
        'Content-Type': 'application/json',
      };

      // Set up body
      const body = {
        grant_type: 'authorization_code',
        client_id: keyString,
        redirect_uri: redirectUrl,
        code,
        code_verifier: codeVerifier,
      };

      // Send request
      const response = await axios.post(tokenEndpoint, body, { headers });
      const data = response.data;
      if (data.access_token == null || data.expires_in == null) return null;

      accessToken = data.access_token;
      expiresAt = Date.now() + (data.expires_in - puffer) * 1000;

      console.log(
        `Successfully fetched new Etsy Access Token that will expire at ${new Date(
          expiresAt
        ).toLocaleTimeString()}`
      );

      return accessToken;
    } catch (e) {
      mapAxiosError(e);
    }
    return null;
  }

  return { ping, generatePKCECodeChallengeUri };
})();
