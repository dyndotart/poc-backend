import express from 'express';
import { etsyApi } from '../../../../core/services/etsy/api.service';

export async function pingController(
  req: express.Request,
  res: express.Response
) {
  const success = await etsyApi.ping();
  res.send(success);
}
