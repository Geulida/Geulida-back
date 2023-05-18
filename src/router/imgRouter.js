import { Router } from 'express';
import { imgController } from '../controller/index.js';
const imgRouter = Router();

imgRouter.post('/img', imgController.createImg);

export default imgRouter;
