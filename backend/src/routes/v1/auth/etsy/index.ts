import express from 'express';
import { controllerWrapper } from '../../../../utils/controller-wrapper';
import {
  authRedirectController,
  getAuthChallengeController,
  getShopReceiptsController,
  pingController,
} from './etsy.controller';

const router = express.Router();

router.get('/ping', controllerWrapper(pingController));
router.get('/oauth/challenge', controllerWrapper(getAuthChallengeController));
router.get('/oauth/redirect', controllerWrapper(authRedirectController));
router.get('/shop/receipts', controllerWrapper(getShopReceiptsController));

export default router;
