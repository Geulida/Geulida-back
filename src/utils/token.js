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
  try {
    if (authorization) {
      const token = authorization.slice(7, authorization.length);
      const decode = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decode;
      next();
    }
    if (!authorization) {
      throw new AppError(CommonError.INVALID_INPUT, '토큰이 입력되지 않았습니다.', 401);
    }
  } catch (error) {
    console.error(error);
    if (error instanceof AppError) {
      throw error;
    } else {
      throw new AppError(CommonError.TOKEN_EXPIRED_ERROR, '만료되었거나 잘못된 토큰입니다.', 401);
    }
  }
};
