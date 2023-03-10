import express from 'express';
import passport from 'passport';
import { initializeGoogleOAuthStrategy } from '../controllers/auth';

const authRouter = express.Router();

initializeGoogleOAuthStrategy();
authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// authRouter.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), function (req, res) {
//   // Serialize user object into session
//   req.login(req.user, function (err) {
//     if (err) console.log(err);
//     // Redirect to home page
//     res.redirect('http://localhost:5173/home');
//   });
// });

authRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: `http://localhost:5173/home`,
    failureRedirect: 'http://localhost:5173/home',
  })
);

export default authRouter;
