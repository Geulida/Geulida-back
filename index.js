const express = require("express");
const app = express();
require("dotenv").config();

const port = process.env.PORT;

const collectionRouter = require('./src/router/collectionRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api",collectionRouter);

app.get("/", (req, res) => {
  res.send("Hello openIA");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
