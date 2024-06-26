import express from 'express';
import dotenv from 'dotenv/config';
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import './auth/passport.js';

import indexRouter from './routes/index.js';
import signupRouter from './routes/signup.js';
import loginRouter from './routes/login.js';

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

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};

app.use('*', cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

const sessionStore = MongoStore.create({
  client: mongoose.connection.getClient(),
  collectionName: 'sessions',
});

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day in ms
    },
  }),
);

app.use(passport.session());

app.use((req, res, next) => {
  console.log(req.session);
  console.log(req.user);
  next();
});

app.use('/', indexRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);

export default app;
