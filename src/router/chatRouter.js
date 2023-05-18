import { Router } from 'express';
import { chatController } from '../controller/index.js';
const chatRouter = Router();

chatRouter.post('/chat', chatController.createChat);
chatRouter.post('/chat/last', chatController.createLastChat);

export default chatRouter;
