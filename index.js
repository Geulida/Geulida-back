const express = require("express");
const app = express();
const mongoose = require('mongoose')
require("dotenv").config();

const port = process.env.PORT;

const collectionRouter = require('./src/router/collectionRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api",collectionRouter);

app.get("/", (req, res) => {
  res.send("Hello openIA");
});

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} )
.then(console.log("connected to mongodb"))
.catch(console.error());

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
  console.log("MongoDB connected!");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
