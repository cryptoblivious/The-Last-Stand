import express from 'express';
import passport from 'passport';
import { initializeGoogleOAuthStrategy } from '../controllers/auth';

const router = express.Router();

initializeGoogleOAuthStrategy();
router.get('/signin/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

export default router;
