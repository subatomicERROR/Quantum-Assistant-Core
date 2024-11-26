import { WeChatService } from '../services/wechat.service.js';
import { logger } from '../utils/logger.js';

export async function handleWeChatMessage(req, res) {
  try {
    const wechatService = new WeChatService();
    const response = await wechatService.processMessage(req.body);
    
    res.json(response);
  } catch (error) {
    logger.error('Error processing WeChat message:', error);
    res.status(400).json({ error: error.message });
  }
}