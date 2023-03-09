import express from 'express';
import passport from 'passport';
import { initializeGoogleOAuthStrategy } from '../controllers/auth';

const router = express.Router();

initializeGoogleOAuthStrategy();
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: `http://localhost:5173/home`,
    failureRedirect: 'http://localhost:5173/home',
  })
);

export default router;
