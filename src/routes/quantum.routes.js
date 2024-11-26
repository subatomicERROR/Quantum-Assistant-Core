import { Router } from 'express';
import { solveQuantumEquation } from '../controllers/quantum.controller.js';

const router = Router();

router.post('/solve', solveQuantumEquation);

export { router as quantumRouter };