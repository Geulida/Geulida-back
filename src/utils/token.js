import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, {
    expiresIn: '30d',
  });
  return token;
};

export const isAuth = (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer xxxxx
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decode;
    next();
  } else {
    res.status(401).json({ message: '토큰이 없다' });
  }
};
