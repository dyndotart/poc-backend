import express from 'express';
import { etsyService } from '../../../../core/services/etsy';
import { AppError } from '../../../../middlewares/error';

export async function pingController(
  req: express.Request,
  res: express.Response
) {
  const success = await etsyService.canCommunicateWithEtsy();
  res.send(success);
}

export async function getAuthChallengeController(
  req: express.Request,
  res: express.Response
) {
  // Test ping to see whether Etsy can be reached with the app credentials
  const success = await etsyService.canCommunicateWithEtsy();
  if (!success) {
    throw new AppError(
      500,
      'Failed to ping etsy! Either Etsy is not reachable or the app credentials are wrong.'
    );
  }

  // Build Challenge URI the user has to call in order to authenticate
  const challenge = etsyService.getPKCECodeChallengeUri();

  res.send(challenge);
}

export async function authRedirectController(
  req: express.Request,
  res: express.Response
) {
  const { code, state, error, error_description } = req.query;
  if (typeof state !== 'string') {
    throw new AppError(400, 'Invalid state provided!');
  }
  if (typeof code !== 'string' && typeof error === 'string') {
    console.error(`Redirect Controller failed with the error '${error}'!`, {
      error,
      error_description,
    });
    return;
  }
  if (typeof code !== 'string') {
    console.error('Redirect Controller failed with an unknown error!');
    return;
  }

  console.log('jeff');

  await etsyService.initAccessToken(code, state);

  res.send(200);
}

export async function getShopReceiptsController(
  req: express.Request,
  res: express.Response
) {
  const receipts = await etsyService.getReceipts();
  res.send(receipts);
}
