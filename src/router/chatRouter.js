import { Router } from 'express';
import { chatController } from '../controller/index.js';
import { isAuth } from '../utils/token.js';
const chatRouter = Router();

chatRouter.post('/chat', isAuth, chatController.createChat);
chatRouter.post('/chat/last', isAuth, chatController.createLastChat);

export default chatRouter;
