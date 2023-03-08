import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { playerSchema as Player } from '../models/player';

dotenv.config();

export const initializeGoogleOAuthStrategy = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: `http://localhost:${process.env.PORT}/auth/google/callback`,
      },
      (accessToken, refreshToken, profile, done) => {
        if (profile.emails && profile.emails.length > 0) {
          const email = profile.emails[0].value;

          console.log('email', email);
        } else {
          console.log('No email found in profile');
        }
        done(null, profile);
      }
    )
  );
  console.log('implementation of google oauth strategy');
};

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username, name: user.name });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});
