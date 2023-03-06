var express = require('express');

var router = express.Router();

var passport = require('passport');
var GoogleStrategy = require('passport-google-oidc');
var db = require('../db');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env['GOOGLE_CLIENT_ID'],
      clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
      callbackURL: '/oauth2/redirect/google',
      scope: ['profile'],
    },
    function verify(issuer, profile, cb) {
      db.get('SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?', [issuer, profile.id], function (err, row) {
        if (err) {
          return cb(err);
        }
        if (!row) {
          db.run('INSERT INTO users (name) VALUES (?)', [profile.displayName], function (err) {
            if (err) {
              return cb(err);
            }

            var id = this.lastID;
            db.run('INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)', [id, issuer, profile.id], function (err) {
              if (err) {
                return cb(err);
              }
              var user = {
                id: id,
                name: profile.displayName,
              };
              return cb(null, user);
            });
          });
        } else {
          db.get('SELECT * FROM users WHERE id = ?', [row.user_id], function (err, row) {
            if (err) {
              return cb(err);
            }
            if (!row) {
              return cb(null, false);
            }
            return cb(null, row);
          });
        }
      });
    }
  )
);
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

router.get('/login', function (req, res, next) {
  res.render('login');
});
router.get('/login/federated/google', passport.authenticate('google'));
router.get(
  '/oauth2/redirect/google',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login',
  })
);
router.post('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});
module.exports = router;
