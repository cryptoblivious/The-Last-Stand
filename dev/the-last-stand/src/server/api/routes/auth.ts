import express from 'express';
import passport from 'passport';
import { checkAuth, logoutUser } from '../controllers/auth';
import dotenv from 'dotenv';
dotenv.config();
const { CLIENT_URL, CLIENT_PORT } = process.env;

const authRouter = express.Router();

authRouter.get('/google', passport.authenticate('google', { accessType: 'offline', prompt: 'consent', scope: ['profile', 'email'] }));

authRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: `${CLIENT_URL}:${CLIENT_PORT}/home`,
    failureRedirect: `${CLIENT_URL}:${CLIENT_PORT}/login`,
  })
);

authRouter.get('/check', checkAuth);

authRouter.delete('/logout', logoutUser);

export default authRouter;
