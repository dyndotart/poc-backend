import express from 'express';

export async function testController(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  // Just for some testing

  res.sendStatus(200);
}
