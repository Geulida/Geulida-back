import { Router } from 'express';
import { imgController } from '../controller/index.js';
import { isAuth } from '../utils/token.js';
const imgRouter = Router();

imgRouter.post('/img', isAuth, imgController.createImg);

export default imgRouter;
