import express from 'express'
import login from '../service/user'
import register from '../service/user'



const userRouter = express.Router();

//유저 로그인
userRouter.post("/login", login);

//
userRouter.post("/register", register);

export default userRouter;
