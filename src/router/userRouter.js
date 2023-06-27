import { Router } from 'express';
import userController from '../controller/userController.js';
import { validateRequestBody } from '../middlewares/validateRequest.js';

const userRouter = Router();

//유저 로그인

userRouter.post('/login', validateRequestBody(['email', 'password']), userController.login);
userRouter.post('/register', validateRequestBody(['email', 'password', 'name']), userController.signup);

export default userRouter;
