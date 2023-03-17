import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';

import { Server } from '@colyseus/core';
import { WebSocketTransport } from '@colyseus/ws-transport';
import { MatchOrchestrator } from './rooms/MatchOrchestrator';
import { monitor } from '@colyseus/monitor';

import { userModel as User } from './models/user';
import { initializeGoogleOAuthStrategy } from './controllers/auth';

import authRouter from './routes/auth';
import usersRouter from './routes/users';

mongoose.set('strictQuery', false);
dotenv.config();

const { MONGO_URI, SESSION_SECRET, CLIENT_URL, CLIENT_PORT } = process.env as Record<string, string>;

//const mongoUri: string = process.env.MONGO_URI?.toString() ?? 'Invalid mongo uri';
//const sessionSecret: string = process.env.SESSION_SECRET?.toString() ?? 'Invalid mongo uri';

const store = new MongoStore({
  mongoUrl: MONGO_URI,
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
  origin: function (origin: any, callback: any) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}; // REF : ChatGPT
app.use(cors(corsOptions));
app.use((req: any, res: { header: (arg0: string, arg1: string) => void }, next: () => void) => {
  //res.header('Access-Control-Allow-Origin', 'https://tls.woodchuckgames.com, http://localhost:5173');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});
app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use(passport.session());
app.use(passport.authenticate('session'));

// Hello World route
app.get('/', (req: any, res: any) => {
  res.json({ msg: "It's time to kick ass and chew bubblegum!" });
});

// Routes
app.use('/auth', authRouter);
app.use('/users', usersRouter);

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
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

// Create a Colyseus server
const gameServer = new Server({
  //server: app.listen(9001),
  transport: new WebSocketTransport(),
});

// Define rooms here
gameServer.define('match_orchestrator', MatchOrchestrator);

// Attach the express instance to the Colyseus server
gameServer.attach({ server: app.listen(9001) });
// Listen for incoming connections on the Colyseus server
//gameServer.listen(9001);

// Listen to your remote server through the http server
//httpServer.listen(9001, 'localhost', () => {
// httpServer.listen(9001, '0.0.0.0', () => {
//   console.log('Listening to remote server 54.210.205.37 on port 9001');
// });
