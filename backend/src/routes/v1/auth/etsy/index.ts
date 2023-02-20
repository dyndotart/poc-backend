import express from 'express';
import { controllerWrapper } from '../../../../utils/controller-wrapper';
import { pingController } from './etsy.controller';

const router = express.Router();

router.get('/ping', controllerWrapper(pingController));

export default router;
