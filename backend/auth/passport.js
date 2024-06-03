import passport from 'passport';
import passportLocal from 'passport-local';

import User from '../models/user';
import { isValidPassword } from './password-utils';

const LocalStrategy = passportLocal.Strategy;

const customFields = {
  usernameField: 'username',
  passwordField: 'password',
};

const verifyCallback = async (username, password, done) => {
  await User.findOne({ username: username })
    .then((user) => {
      if (!user) return done(null, false);

      const isValid = isValidPassword(password, user.hash, user.salt);

      if (isValid) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch((err) => done(err));
};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((userId, done) => {
  User.findById(userId)
    .then((user) => done(null, user))
    .catch((err) => done(err));
});
