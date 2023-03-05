import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';

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
        // This function will be called after the user successfully logs in
        // and authorizes your app to access their Google account information.
        // You can use the provided access token to retrieve the user's information
        // and store it in your app's state or database as needed.
        // The `done` function should be called with the user object to signal success.
        done(null, profile);
      }
    )
  );
  console.log('implementation of google oauth strategy');
};
