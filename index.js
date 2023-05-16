const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRouter = require("./src/controller/user");
require("dotenv").config();

const port = process.env.PORT;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MONGODB CONNECTED");
  })
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", userRouter);
app.get("/", (req, res) => {
  res.send("Hello openIA");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
