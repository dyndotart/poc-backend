import { Router } from 'express';
import { STAGE } from '../../config';
import { controllerWrapper } from '../../utils/controller-wrapper';
import { testController } from './v1.controller';
import renderRoutes from './render';

const router = Router();

router.get('/test', controllerWrapper(testController, STAGE.LOCAL));
router.use('/render', renderRoutes);

export default router;
