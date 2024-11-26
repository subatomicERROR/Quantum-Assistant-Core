import { Router } from 'express';
import { handleWeChatMessage } from '../controllers/wechat.controller.js';

const router = Router();

router.post('/webhook', handleWeChatMessage);

export { router as wechatRouter };