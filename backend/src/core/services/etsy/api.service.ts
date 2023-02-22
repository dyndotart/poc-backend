import axios from 'axios';
import crypto from 'crypto';
import etsyConfig from '../../../environment/config/etsy.config';
import { mapAxiosError } from '../../../utils/map-error';
import { TEtsyPingResponseDto } from './types';

export const etsyApi = (() => {
  const keyString = etsyConfig.auth.keyString;
  const sharedSecret = etsyConfig.auth.sharedSecret;
  const authEndpoint = etsyConfig.auth.endpoint;
  const apiEndpoint = etsyConfig.baseUrl;

  async function fetchAccessToken(): Promise<string | null> {
    try {
      console.log('Jeff');
    } catch (e) {
      mapAxiosError(e);
    }
    return null;
  }

  // https://developers.etsy.com/documentation/tutorials/quickstart#test-your-api-key
  async function ping(): Promise<boolean> {
    try {
      // Set up headers
      const headers = {
        'x-api-key': keyString,
      };

      // Sent request
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

  // https://developers.etsy.com/documentation/tutorials/quickstart#generate-the-pkce-code-challenge
  function generatePKCECodeChallenge(): string {
    // The next two functions help us generate the code challenge
    // required by Etsy’s OAuth implementation.
    const base64URLEncode = (str: any) =>
      str
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');

    const sha256 = (buffer: any) =>
      crypto.createHash('sha256').update(buffer).digest();

    // We’ll use the verifier to generate the challenge.
    // The verifier needs to be saved for a future step in the OAuth flow.
    const codeVerifier = base64URLEncode(crypto.randomBytes(32));

    // With these functions, we can generate
    // the values needed for our OAuth authorization grant.
    const codeChallenge = base64URLEncode(sha256(codeVerifier));
    const state = Math.random().toString(36).substring(7);

    return `https://www.etsy.com/oauth/connect?response_type=code&redirect_uri=http://localhost:3003/oauth/redirect&scope=email_r&client_id=1aa2bb33c44d55eeeeee6fff&state=${state}&code_challenge=${codeChallenge}&code_challenge_method=S256`;
  }

  return { ping, generatePKCECodeChallenge };
})();
