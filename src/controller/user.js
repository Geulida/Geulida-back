const { Router } = require("express");
const { register, login } = require("../service/user");

const userRouter = Router();

//유저 로그인
userRouter.post("/login", login);

//
userRouter.post("/register", register);

module.exports = userRouter;
