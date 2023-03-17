import https from 'https';
import fs from 'fs';
import path from 'path';
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

const { APP_MODE, MONGO_URI, SESSION_SECRET, CLIENT_URL, CLIENT_PORT, HOST_PORT } = process.env as Record<string, string>;

const store = new MongoStore({
  mongoUrl: MONGO_URI,
  collectionName: 'sessions',
});

// Load SSL certificates and private keys if in production mode
let sslOptions: any = {};
if (APP_MODE === 'prod') {
  sslOptions = {
    key: fs.readFileSync('/etc/letsencrypt/live/stls.woodchuckgames.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/stls.woodchuckgames.com/fullchain.pem'),
  };
}

// Create an express app
const app = express();

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, 'build'))); // REF : ChatGPT

// Serve the index.html file for all other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
}); // REF : ChatGPT

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
  transport: new WebSocketTransport(),
});

// Define rooms here
gameServer.define('match_orchestrator', MatchOrchestrator);

// Attach the express instance to the https server
const server = https.createServer(sslOptions, app);

// Attach the express instance to the Colyseus server
if (APP_MODE === 'dev') {
  gameServer.attach({ server: app.listen(HOST_PORT) });
} else {
  gameServer.attach({ server: server.listen(HOST_PORT) });
}
