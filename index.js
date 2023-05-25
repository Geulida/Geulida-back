// Package
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

// Env
dotenv.config();
const port = process.env.PORT || 3000;

//Module
import { collectionRouter, imgRouter, chatRouter, userRouter } from './src/router/index.js';

const app = express();

// Middleware
app.use(
  cors({
    origin: 'http://localhost:3001',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', collectionRouter);
app.use('/api', imgRouter);
app.use('/api', chatRouter);
app.use('/api', userRouter);

// app.use('/api', userRouter);

app.get('/', (req, res) => {
  res.send('Hello openAI');
});

//DB
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('connected to mongodb');
  })
  .catch((error) => {
    console.error(error);
  });

// Listen
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
