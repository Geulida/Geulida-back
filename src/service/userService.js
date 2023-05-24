import bcrypt from 'bcrypt';
const saltRounds = 10;

import User from '../models/schema/userSchema.js';
import { generateToken } from '../utils/token.js';

const Auth = {
  async login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        const token = generateToken(JSON.stringify(user));
        res.send({
          token,
        });
      }
      return;
    }
    res.status(400).send({ message: 'Invalid Email or Password' });
  },

  async register(req, res) {
    try {
      const { email, name, password } = req.body;

      const isExist = await User.findOne({ email });
      if (isExist) {
        res.status(400).json({
          message: '이미 존재하는 이메일 입니다',
        });
        return;
      }

      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(password, salt);
      const newUser = await User.create({ email, name, password: hash });
      res.send({ message: '회원가입 성공하셨습니다' });
    } catch (err) {
      res.status(400).send(err);
    }
  },

  async test(req, res) {
    const { a } = req.body;
    res.send(a);
  },
};

export default Auth;
