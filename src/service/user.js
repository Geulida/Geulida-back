import bcrypt from "bcrypt"
const  saltRounds = 10;

import  User  from "../models/schema/user"
import generateToken from '../utils'

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    if (bcrypt.compareSync(password, user.password)) {
      const token = generateToken(JSON.stringify(user));
      res.send({
        name: user.name,
        email: user.email,
        token,
      });
    }
    return;
  }
  res.status(400).send({ message: "Invalid Email or Password" });
};

export const register = async (req, res) => {
  const { email, name, password } = req.body;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);

  const newUser = await User.create({ email, name, password: hash });

  res.send(newUser);
};

