import http from 'http';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';

import { Server } from '@colyseus/core';
import { WebSocketTransport } from '@colyseus/ws-transport';
import { MatchOrchestrer } from './rooms/MatchOrchestrer';
import { monitor } from '@colyseus/monitor';

import { userModel as User } from './models/user';
import { initializeGoogleOAuthStrategy } from './controllers/auth';

import authRouter from './routes/auth';
import usersRouter from './routes/users';

import { HOSTNAME } from '../common/constants';

mongoose.set('strictQuery', false);
dotenv.config();
const mongoUri: string = process.env.MONGO_URI?.toString() ?? 'Invalid mongo uri';
const sessionSecret: string = process.env.SESSION_SECRET?.toString() ?? 'Invalid mongo uri';

const store = new MongoStore({
  mongoUrl: process.env.MONGO_URI,
  collectionName: 'sessions',
});

// Create an express app
const app = express();

// Define routes or middleware for your express app here, if any
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err: any, user: boolean | Express.User | null | undefined) => {
    done(err, user);
  });
});

initializeGoogleOAuthStrategy();

const whitelist = ['https://tls.woodchuckgames.com', 'http://localhost:5173'];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.use(cors(corsOptions));
app.use((req: any, res: { header: (arg0: string, arg1: string) => void }, next: () => void) => {
  //res.header('Access-Control-Allow-Origin', 'https://tls.woodchuckgames.com, http://localhost:5173');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});
app.use(express.json());
app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use(passport.session());
app.use(passport.authenticate('session'));

// Routes
app.use('/auth', authRouter);
app.use('/users', usersRouter);

// Dummy route
app.get('/', (req: any, res: any) => {
  res.json({ msg: "It's time to kick ass and chew bubblegum!" });
});

// Connect to MongoDB
mongoose
  .connect(mongoUri, { useNewUrlParser: true })
  .then(() => {
    console.log(`Connected to MongoDB`);
  })
  .catch((err) => console.log(err));

/**
 * Bind @colyseus/monitor
 * It is recommended to protect this route with a password.
 * Read more: https://docs.colyseus.io/tools/monitor/
 */
app.use('/colyseus', monitor());

// Create an http server that will listen to your remote server
const httpServer = http.createServer(app);

// Create a Colyseus server
const gameServer = new Server({
  server: httpServer, // Pass in the http server we created
  transport: new WebSocketTransport(),
});

// Define rooms here
gameServer.define('match_orchestrer', MatchOrchestrer);

// Listen for incoming connections on the Colyseus server
gameServer.listen(9001);

// Listen to your remote server through the http server
//httpServer.listen(9001, 'localhost', () => {
httpServer.listen(9001, HOSTNAME, () => {
  console.log('Listening to remote server 123.456.789.0 on port 9001');
});
