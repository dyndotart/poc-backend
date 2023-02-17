import { Router } from 'express';
import { controllerWrapper } from '../../../utils/controller-wrapper';
import { renderRemotion } from './render.controller';
import { GetTestParams } from './types';

const router = Router();

router.get(
  `remotion/:${GetTestParams.compositionname}.:${GetTestParams.format}(png|jpe?g)`,
  controllerWrapper(renderRemotion)
);

export default router;
