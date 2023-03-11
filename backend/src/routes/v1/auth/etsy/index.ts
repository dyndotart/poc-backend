import express from 'express';
import { controllerWrapper } from '../../../../utils/controller-wrapper';
import {
  authRedirectController,
  getAuthChallengeController,
  pingController,
} from './etsy.controller';

const router = express.Router();

router.get('/ping', controllerWrapper(pingController));
router.get('/oauth/challenge', controllerWrapper(getAuthChallengeController));
router.get('/oauth/redirect', controllerWrapper(authRedirectController));

export default router;
