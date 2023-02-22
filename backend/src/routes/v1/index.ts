import { Router } from 'express';
import { STAGE } from '../../environment/config';
import { controllerWrapper } from '../../utils/controller-wrapper';
import authRoutes from './auth';
import renderRoutes from './render';
import { testController } from './v1.controller';

const router = Router();

router.get('/test', controllerWrapper(testController, STAGE.LOCAL));
router.use('/render', renderRoutes);
router.use('/auth', authRoutes);

export default router;
