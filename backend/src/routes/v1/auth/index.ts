import express from 'express';
import etsyRoutes from './etsy';

const router = express.Router();

router.use('/etsy', etsyRoutes);

export default router;
