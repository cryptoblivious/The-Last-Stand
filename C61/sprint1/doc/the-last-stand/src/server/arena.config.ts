// Colyseus imports
import Arena from '@colyseus/arena';
import { monitor } from '@colyseus/monitor';

// Express imports
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import session from 'express-session';

import players from './routes/players';
import auth from './routes/auth';

mongoose.set('strictQuery', false);
dotenv.config();
const mongoUri: string = process.env.MONGO_URI?.toString() ?? 'Banane';

/**
 * Import your Room files
 */
import { MyRoom } from './rooms/MyRoom';
import { MatchRoom } from './rooms/MatchRoom';
export default Arena({
  getId: () => 'Your Colyseus App',

  initializeGameServer: (gameServer: any) => {
    /**
     * Define your room handlers:
     */
    gameServer.define('my_room', MyRoom);

    //create a match room
    gameServer.define('match_room', MatchRoom);
  },

  initializeExpress: (app: any) => {
    // Middlewares
    app.use(cors());
    app.use(express.json());
    app.use((req, res, next) => {
      console.log(req.path, req.method);
      next();
    });

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
