import { Router } from 'express';
import { productsHandler, recalculateSustainabilityScore } from '../controllers/product.controller.js';

const router = Router();

router.get('/', productsHandler);
router.get('/recalculate-score', recalculateSustainabilityScore);

export default router;