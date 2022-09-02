'use strict';

exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(403).send('not logged in');
  }
  next();
};

exports.isNotLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    const message = encodeURIComponent('logged in');
    return res.redirect(`/?error${message}`);
  }
  next();
};
