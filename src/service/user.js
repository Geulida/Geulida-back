const bcrypt = require("bcrypt");
const saltRounds = 10;

const User = require("../models/schema/user");
const { generateToken } = require("../utils");

const login = async (req, res) => {
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

const register = async (req, res) => {
  const { email, name, password } = req.body;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);

  const newUser = await User.create({ email, name, password: hash });

  res.send(newUser);
};

module.exports = { login, register };
