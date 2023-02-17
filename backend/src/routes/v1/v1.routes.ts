import { Router } from 'express';
import { testController } from './v1.controller';

const router = Router();

router.get('/test', testController);

export default router;
