import { Router } from 'express';
import { substitution } from '../controllers/substitution.controller.js';

const router = Router();

router.get('/', substitution);

export default router;