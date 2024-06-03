import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

import indexRouter from './routes/index.js';

const app = express();

// connect to database
mongoose.set('strictQuery', false);
const mongoDB = process.env.MONGO_URI;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(mongoDB);
  console.log(
    `mongoose connection readyState = ${mongoose.connection.readyState}`,
  );
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

export default app;
