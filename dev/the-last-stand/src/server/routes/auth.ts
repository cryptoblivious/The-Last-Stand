import express from 'express';
import passport from 'passport';

const authRouter = express.Router();

authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

authRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: `http://localhost:5173/home`,
    failureRedirect: 'http://localhost:5173/login',
  })
);

export default authRouter;
