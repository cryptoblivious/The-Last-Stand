// Colyseus imports
import Arena from '@colyseus/arena';
import { monitor } from '@colyseus/monitor';

// Express imports
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';

import players from './routes/players';
import auth from './routes/auth';

mongoose.set('strictQuery', false);
dotenv.config();
const mongoUri: string = process.env.MONGO_URI?.toString() ?? 'Invalid mongo uri';
const sessionSecret: string = process.env.SESSION_SECRET?.toString() ?? 'Invalid mongo uri';

const store = new MongoStore({
  mongoUrl: process.env.MONGO_URI,
  collectionName: 'sessions',
});

/**
 * Import your Room files
 */
import { MatchRoom } from './rooms/MatchRoom';
export default Arena({
  getId: () => 'Your Colyseus App',

  initializeGameServer: (gameServer: any) => {
    /**
     * Define your room handlers:
     */

    //create a match room
    gameServer.define('match_room', MatchRoom);
  },

  initializeExpress: (app: any) => {
    // Middlewares
    app.use(cors());
    app.use(express.json());
    app.use(
      session({
        secret: sessionSecret,
        resave: false,
        saveUninitialized: false,
        store: store,
      })
    );
    app.use(passport.authenticate('session'));

    // Dummy route
    app.get('/', (req: any, res: any) => {
      res.json({ msg: "It's time to kick ass and chew bubblegum!" });
    });

    // Routes
    app.use('/api/players', players);
    app.use('/auth', auth);

    // Connect to MongoDB
    console.log(mongoUri);
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
  },

  beforeListen: () => {
    /**
     * Before before gameServer.listen() is called.
     */
  },
});
