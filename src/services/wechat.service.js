import axios from 'axios';
import { logger } from '../utils/logger.js';
import { QuantumSolver } from './quantum/solver.service.js';
import { QuantumMLService } from './quantum/ml.service.js';

export class WeChatService {
  constructor() {
    this.apiUrl = process.env.WECHAT_API_URL;
    this.appId = process.env.WECHAT_APP_ID;
    this.appSecret = process.env.WECHAT_APP_SECRET;
    this.logger = logger;
    this.quantumSolver = new QuantumSolver();
    this.quantumML = new QuantumMLService();
  }

  async processMessage(messageData) {
    try {
      const { Content, FromUserName, ToUserName, CreateTime } = messageData;
      
      const parameters = this.parseParameters(Content);
      const [solverResult, mlResult] = await Promise.all([
        this.quantumSolver.solve(parameters),
        this.quantumML.predict(parameters)
      ]);

      const response = {
        quantum: solverResult,
        ml: mlResult
      };

      return {
        ToUserName: FromUserName,
        FromUserName: ToUserName,
        CreateTime,
        MsgType: 'text',
        Content: `Quantum Analysis Result: ${JSON.stringify(response, null, 2)}`
      };
    } catch (error) {
      this.logger.error('WeChat message processing error:', error);
      throw error;
    }
  }

  parseParameters(content) {
    try {
      if (!content || typeof content !== 'string') {
        throw new Error('Invalid message content');
      }
      const params = content.split(',').map(Number);
      if (params.some(isNaN)) {
        throw new Error('Parameters must be valid numbers');
      }
      return params;
    } catch (error) {
      this.logger.error('Parameter parsing error:', error);
      throw new Error('Invalid parameter format');
    }
  }
}