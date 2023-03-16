import express from 'express';
import passport from 'passport';
import { checkAuth } from '../controllers/auth';

const authRouter = express.Router();

authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

authRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: `https://tls.woodchuckgames.com/home`,
    failureRedirect: 'https://tls.woodchuckgames.com/login',
    //successRedirect: `http://localhost:5173/home`,
    //failureRedirect: 'http://localhost:5173/login',
  })
);

authRouter.get('/check', checkAuth);

export default authRouter;
