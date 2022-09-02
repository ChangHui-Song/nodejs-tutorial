'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          const exUser = await User.findOne({ where: { email } });
          if (!exUser) {
            return done(null, false, { message: 'no user' });
          }
          const result = await bcrypt.compare(password, exUser.passport);
          if (result) {
            return done(null, exUser);
          }
          return done(null, false, {
            message: 'password do not match',
          });
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
