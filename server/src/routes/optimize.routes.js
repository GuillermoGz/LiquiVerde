import { Router } from 'express';
import { optimize } from '../controllers/optimize.controller.js';

const router = Router();

router.post('/', optimize);

export default router;
