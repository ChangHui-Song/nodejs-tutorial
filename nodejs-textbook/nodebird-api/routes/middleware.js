'use strict';

const jwt = require('jsonwebtoken');

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

exports.verifyToken = (req, res, next) => {
  try {
    req.decoded = jwt.verify(req.headers.authoriztion, process.env.JWT_SECRET);
    return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(419).json({
        code: 419,
        message: '토큰이 만료되었습니다.',
      });
    }
    return res.status(401).json({
      code: 401,
      message: '유효하지 않은 토큰입니다.',
    });
  }
};
