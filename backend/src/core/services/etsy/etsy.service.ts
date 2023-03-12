import { etsyApi } from './api.service';

export const etsyService = (() => {
  async function canCommunicateWithEtsy(): Promise<boolean> {
    return await etsyApi.ping();
  }

  function getPKCECodeChallengeUri(): string {
    return etsyApi.generatePKCECodeChallengeUri();
  }

  async function initAccessToken(code: string, state: string): Promise<void> {
    await etsyApi.fetchAccessTokenByAuthorizationCode(code, state);
  }

  async function getReceipts(): Promise<any> {
    const me = await etsyApi.getMe();
    if (me == null) return [];
    return await etsyApi.getShopReceipts(me.shop_id);
  }

  return {
    canCommunicateWithEtsy,
    getPKCECodeChallengeUri,
    initAccessToken,
    getReceipts,
  };
})();
