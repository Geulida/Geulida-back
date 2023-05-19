import express from 'express';
import Auth from '../service/userService.js';

const userRouter = express.Router();

//유저 로그인
userRouter.post('/login', Auth.login);

//
userRouter.post('/register', Auth.register);
userRouter.post('/test', Auth.test);

export default userRouter;
