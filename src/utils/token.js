import jwt from 'jsonwebtoken';
import { AppError, CommonError } from '../middlewares/errorHandler.js';

export const generateToken = (user) => {
  const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, {
    expiresIn: '30d',
  });
  return token;
};

export const isAuth = (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization) {
    try {
      const token = authorization.slice(7, authorization.length);
      const decode = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decode;
      next();
    } catch (err) {
      throw new AppError(CommonError.TOKEN_EXPIRED_ERROR, '잘못된 토큰입니다', 500);
    }
  } else {
    res.status(401).json({ message: '발급된 토큰이 없습니다' });
  }
};
