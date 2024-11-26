import { logger } from '../../utils/logger.js';
import { QuantumCircuitService } from './circuit.service.js';

export class QuantumSolver {
  constructor() {
    this.logger = logger;
    this.circuitService = new QuantumCircuitService();
  }

  async solve(parameters) {
    try {
      if (!Array.isArray(parameters)) {
        throw new Error('Parameters must be an array');
      }

      const circuit = this.createProblemCircuit(parameters);
      const result = await this.circuitService.simulate(circuit);

      return {
        result,
        parameters,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      this.logger.error('Quantum solving error:', error);
      throw new Error('Failed to solve quantum problem');
    }
  }

  createProblemCircuit(parameters) {
    const numQubits = Math.max(2, Math.ceil(Math.log2(parameters.length)));
    let circuit = this.circuitService.createQuantumCircuit(numQubits);

    // Apply quantum gates based on parameters
    parameters.forEach((param, index) => {
      if (index < numQubits) {
        circuit = this.circuitService.addGate(circuit, 'H', index);
        if (param > 0.5) {
          circuit = this.circuitService.addGate(circuit, 'X', index);
        }
        circuit = this.circuitService.addGate(circuit, 'Z', index);
      }
    });

    // Add measurements
    for (let i = 0; i < numQubits; i++) {
      circuit = this.circuitService.measure(circuit, i);
    }

    return circuit;
  }
}