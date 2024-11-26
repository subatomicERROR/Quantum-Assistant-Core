import { QuantumSolver } from '../services/quantum.service.js';
import { logger } from '../utils/logger.js';

export async function solveQuantumEquation(req, res) {
  try {
    const { parameters } = req.body;
    const solver = new QuantumSolver();
    const result = await solver.solve(parameters);
    
    res.json({ result });
  } catch (error) {
    logger.error('Error in quantum equation solving:', error);
    res.status(400).json({ error: error.message });
  }
}