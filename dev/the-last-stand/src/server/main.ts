import dotenv from 'dotenv';

import https from 'https';
import fs from 'fs';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';

// Colyseus
import { Server } from '@colyseus/core';
import { WebSocketTransport } from '@colyseus/ws-transport';
import { MatchOrchestrator } from './rooms/MatchOrchestrator';
import { monitor } from '@colyseus/monitor';

// Homemade models
import { userModel as User } from './api/models/user';

// Homemade controllers
import { initializeGoogleOAuthStrategy } from './api/controllers/auth';

// Homemade routes
import authRouter from './api/routes/auth';
import usersRouter from './api/routes/users';
import heroesRouter from './api/routes/heroes';

console.log('    ___      _');
console.log('   / __\\___ | |_   _ ___  ___ _   _ ___');
console.log('  / /  / _ \\| | | | / __|/ _ \\ | | / __|');
console.log(' / /__| (_) | | |_| \\__ \\  __/ |_| \\__ \\');
console.log(' \\____/\\___/|_|\\__, |___/\\___|\\__,_|___/');
console.log('               |___/');
console.log('--------------------------------------------------');
console.log('A Fast, Powerful, Open-source Multiplayer Framework');
console.log('--------------------------------------------------');
console.log('Starter file created by Andrzej Wisniowski. Find my other projects at https://github.com/cryptoblivious');
console.log('--------------------------------------------------');

mongoose.set('strictQuery', false);
dotenv.config();

const { APP_MODE, MONGO_URI, SESSION_SECRET, CLIENT_URL, CLIENT_PORT, HOST_PORT } = process.env as Record<string, string>;

const store = new MongoStore({
  mongoUrl: MONGO_URI,
  collectionName: 'sessions',
});
console.log('✅ Session store created.');

// Load SSL certificates and private keys if in production mode
let sslOptions: any = {};
if (APP_MODE === 'prod') {
  sslOptions = {
    wsEngine: 'uws',
    key: fs.readFileSync('/etc/letsencrypt/live/stls.woodchuckgames.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/stls.woodchuckgames.com/fullchain.pem'),
  };
  console.log('✅ SSL certificates loaded.');
}

// Create an express app
const app = express();
app.use(express.json());

console.log('✅ Express app created.');

// Define routes or middleware for your express app here, if any

// Redirect to https if in production mode
if (APP_MODE === 'prod') {
  app.use((req, res, next) => {
    if (req.secure) {
      next();
    } else {
      res.redirect(`https://${req.headers.host}${req.url}`);
    }
  });
  console.log('✅ Redirect to https enabled.');
}

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
app.use((req: any, res: { header: (arg0: string, arg1: string) => void }, next: () => void) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});
app.use(cors(corsOptions));
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
console.log('✅ Middleware defined.');

// Hello World route
app.get('/', (req: any, res: any) => {
  res.json({ msg: "It's time to kick ass and chew bubblegum!" });
});

// Routes
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/heroes', heroesRouter);

/**
 * Bind @colyseus/monitor
 * It is recommended to protect this route with a password.
 * Read more: https://docs.colyseus.io/tools/monitor/
 */
app.use('/colyseus', monitor());
console.log('✅ Routes defined.');

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`✅ Connected to MongoDB.`);
  })
  .catch((err) => console.log(err));

// Create a Colyseus server
const gameServer = new Server({
  transport: new WebSocketTransport(),
});
console.log('✅ Websocket transport initiated.');

// Define rooms here
gameServer.define('match_orchestrator', MatchOrchestrator);
console.log('✅ match_orchestrator room defined.');

// Attach the express instance to the Colyseus server
if (APP_MODE === 'dev') {
  gameServer.attach({ server: app.listen(HOST_PORT) });
  console.log('✅ Express server attached.');
} else {
  // Attach the express instance to the https server and the Colyseus server
  const server = https.createServer(sslOptions, app);
  gameServer.attach({ server: server.listen(HOST_PORT) });
  console.log('✅ Secure server attached.');
}
