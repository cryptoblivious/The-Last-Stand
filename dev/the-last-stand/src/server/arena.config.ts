// Colyseus imports
import Arena from '@colyseus/arena';
import { monitor } from '@colyseus/monitor';

// Express imports
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';

import { userModel as User } from './api/models/user';

import { initializeGoogleOAuthStrategy } from './api/controllers/auth';

import authRouter from './api/routes/auth';
import usersRouter from './api/routes/users';

mongoose.set('strictQuery', false);
dotenv.config();
const { MONGO_URI, SESSION_SECRET, CLIENT_URL, CLIENT_PORT } = process.env as Record<string, string>;

//const mongoUri: string = process.env.MONGO_URI?.toString() ?? 'Invalid mongo uri';
//const sessionSecret: string = process.env.SESSION_SECRET?.toString() ?? 'Invalid mongo uri';

const store = new MongoStore({
  mongoUrl: MONGO_URI,
  collectionName: 'sessions',
});

/**
 * Import your Room files
 */
import { MatchOrchestrator } from './rooms/MatchOrchestrator';
import heroesRouter from './api/routes/heroes';
export default Arena({
  getId: () => 'Your Colyseus App',

  initializeGameServer: (gameServer: any) => {
    /**
     * Define your room handlers:
     */

    //create a match room
    gameServer.define('match_orchestrator', MatchOrchestrator);
  },

  // Define your express/koa middlewares (they are applied in the order you define)
  initializeExpress: (app: any) => {
    // Middlewares
    passport.serializeUser((user, done) => {
      done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
      User.findById(id, (err: any, user: boolean | Express.User | null | undefined) => {
        done(err, user);
      });
    });

    initializeGoogleOAuthStrategy();

    app.use(cors());
    app.use((req: any, res: { header: (arg0: string, arg1: string) => void }, next: () => void) => {
      res.header('Access-Control-Allow-Origin', `${CLIENT_URL}:${CLIENT_PORT}`);
      //res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
      res.header('Access-Control-Allow-Credentials', 'true');
      next();
    });
    app.use(express.json());
    app.use(
      session({
        secret: SESSION_SECRET,
        //secret: sessionSecret,
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
    app.use('/heroes', heroesRouter);


    // Dummy route
    app.get('/', (req: any, res: any) => {
      res.json({ msg: "It's time to kick ass and chew bubblegum!" });
    });

    // Connect to MongoDB
    mongoose
      .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
      //.connect(mongoUri, { useNewUrlParser: true })
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
