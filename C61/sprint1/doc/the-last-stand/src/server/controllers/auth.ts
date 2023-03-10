import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import { userModel as User } from '../models/user';
import { roleModel as Role } from '../models/role';
import { findUniqueNumber, formatNumber, unformatNumbers } from '../../utils/maths';

dotenv.config();

// export const initializeGoogleOAuthStrategy = () => {
//   passport.use(
//     new GoogleStrategy(
//       {
//         clientID: process.env.GOOGLE_CLIENT_ID!,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//         callbackURL: `http://localhost:${process.env.PORT}/auth/google/callback`,
//       },
//       async (accessToken, refreshToken, profile, done) => {
//         if (profile.emails && profile.emails.length > 0) {
//           const email: string = profile.emails[0].value;
//           try {
//             const existingUser = await User.findOne({ email: email });
//             if (existingUser) {
//               // user already exists in the database, return it
//               const updatedUser = await User.findOneAndUpdate({ email: email }, { lastOnline: 'now' });
//               return done(null, updatedUser);
//             } else {
//               const userWithSameName = await User.findOne({ username: profile.name?.givenName });
//               let userNo = formatNumber(0);
//               if (userWithSameName) {
//                 // if a user with the same name already exists, add an available number to the userNo field
//                 const usersWithSameName = await User.find({ username: profile.name?.givenName }).exec();
//                 const usedNosStrings = usersWithSameName.map((user: any) => user.userNo);
//                 const usedNosValues = unformatNumbers(usedNosStrings);
//                 userNo = formatNumber(findUniqueNumber(usedNosValues, 1000));
//               }
//               const newUser = new User({
//                 email: email,
//                 username: profile.name?.givenName,
//                 userNo: userNo,
//                 title: 'N00bzor',
//                 avatar: null,
//                 lastOnline: new Date(),
//               });
//               await newUser.save();
//               return done(null, newUser);
//             }
//           } catch (err: any) {
//             console.error(err);
//             return done(err, undefined);
//           }
//         }
//       }
//     )
//   );
// };

// Version with session fixation attack protection

export const initializeGoogleOAuthStrategy = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: `http://localhost:${process.env.PORT}/auth/google/callback`,
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
              // if a user with the same name already exists, add an available number to the userNo field
              const usersWithSameName = await User.find({ username: profile.name?.givenName }).exec();
              const usedNosStrings = usersWithSameName.map((user: any) => user.userNo);
              const usedNosValues = unformatNumbers(usedNosStrings);
              userNo = formatNumber(findUniqueNumber(usedNosValues, 9999));
            }
            user = new User({
              email: email,
              username: profile.name?.givenName,
              userNo: userNo,
              title: 'N00bzor',
              avatar: null,
              lastOnline: new Date(),
            });
            await user.save();
            // Create a new session ID to prevent session fixation attacks
            req.session.regenerate((err) => {
              if (err) {
                console.error('Error regenerating session:', err);
                return done(err);
              }
              // Store the user ID in the session
              req.session.userId = user._id;
              return done(null, user);
            });
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
