// Package
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Env
dotenv.config();
const port = process.env.PORT || 3000;

//Module
import { collectionRouter, imgRouter } from './src/router/index.js';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', collectionRouter);
app.use('/api', imgRouter);
// app.use('/api', userRouter);

app.get('/', (req, res) => {
  res.send('Hello openAI');
});

//DB
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log('connected to mongodb'))
  .catch(console.error());

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  console.log('MongoDB connected!');
});

// Listen
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
