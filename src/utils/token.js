import jwt from "jsonwebtoken"

export const generateToken = (user) => {
  const token = jwt.sign(
    { email: user.email, name: user.name },
    process.env.SECRETE,
    {
      expiresIn: "30d",
    }
  );
  return token;
};

