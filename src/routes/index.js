import { Router } from 'express';
import { quantumRouter } from './quantum.routes.js';
import { wechatRouter } from './wechat.routes.js';

export function setupRoutes(app) {
  const apiRouter = Router();
  
  apiRouter.use('/quantum', quantumRouter);
  apiRouter.use('/wechat', wechatRouter);
  
  app.use('/api', apiRouter);
}