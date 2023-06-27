import { Router } from 'express';
import Auth from '../services/userService.js';

const userRouter = Router();

//유저 로그인
userRouter.post('/login', Auth.login);

//
userRouter.post('/register', Auth.register);
userRouter.post('/test', Auth.test);

export default userRouter;
