import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import { userModel as User } from '../models/user';
import { roleModel as Role } from '../models/role';
import { formatNumber } from '../../../utils/maths';
import { findAvailableUsernameNumber } from './users';

dotenv.config();
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, HOST_URL, HOST_PORT } = process.env;

export const initializeGoogleOAuthStrategy = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID!,
        clientSecret: GOOGLE_CLIENT_SECRET!,
        callbackURL: `${HOST_URL}:${HOST_PORT}/auth/google/callback`,
        passReqToCallback: true,
      },
      async (req, accessToken, refreshToken, profile, done) => {
        try {
          const email: string = profile.emails[0].value;
          let user = await User.findOne({ email: email });
          if (user) {
            // user already exists in the database, return it
            const user = await User.findOneAndUpdate({ email: email }, { lastOnline: 'now' });
            return done(null, user);
          } else {
            const userWithSameName = await User.findOne({ username: profile.name?.givenName });
            let userNo = formatNumber(0);
            if (userWithSameName) {
              userNo = await findAvailableUsernameNumber(profile.name!.givenName);
            }
            user = new User({
              email: email,
              username: profile.name?.givenName,
              userNo: userNo,
              title: 'N00bzor',
              avatar: null,
              lastOnline: 'now',
            });
            await user.save();
            return done(null, user);
          }
        } catch (err: any) {
          console.error(err);
          return done(err, undefined);
        }
      }
    )
  );
};

// Verify if user is authenticated for a React Router route
export const checkAuth = (req: any, res: any, next: any) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({ message: 'Authorized' });
  } else {
    return res.status(401).json({ message: 'Not authenticated' });
  }
};

// Verify if user is authenticated for an Express route
export const isAuthenticated = (req: any, res: any, next: any) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status(401).json({ message: 'Not authenticated' });
  }
};

// Verify if user is admin for an Express route
export const isAdmin = async (req: any, res: any, next: any) => {
  const isAdmin = await Role.findOne({ username: req.user.username, role: 'admin' });

  if (req.isAuthenticated() && isAdmin) {
    return next();
  } else {
    res.redirect('/login');
  }
};

// Logout user v6
export const logoutUser = async (req: any, res: any) => {
  const user = await User.findOneAndUpdate({ email: req.user.email }, { lastOnline: new Date() });

  req.logout((err: any) => {
    if (err) {
      return res.status(500).json({ message: err });
    }
    return res.status(200).json({ message: 'Logged out' });
  });
};
