import express from 'express';
import { etsyApi } from '../../../../core/services/etsy/api.service';
import { AppError } from '../../../../middlewares/error';

export async function pingController(
  req: express.Request,
  res: express.Response
) {
  const success = await etsyApi.ping();
  res.send(success);
}

export async function getAuthChallengeController(
  req: express.Request,
  res: express.Response
) {
  const success = await etsyApi.ping();
  if (!success) {
    throw new AppError(500, "Couldn't ping etsy! Credentials probably wrong.");
  }
  const challenge = await etsyApi.generatePKCECodeChallengeUri();
  res.send(challenge);
}

export async function authRedirectController(
  req: express.Request,
  res: express.Response
) {
  const { code, state } = req.query;
  if (code == null) {
    throw new AppError(400, 'Invalid auth code provided!');
  }
  console.log({ code, state });
  // TODO
}
