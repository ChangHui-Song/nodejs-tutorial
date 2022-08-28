const express = require('express');

const { isLoggedIn } = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

router.post('/:id/follow', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      res.status(404).send('no user');
    }
    await user.addFollowing(parseInt(req.params.id, 10));
    res.send('success');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/:nick/unfollow', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { nick: req.params.nick } });
    console.log(user);
    if (!user) {
      res.status(404).send('no user');
    }
    await user.removeFollower(parseInt(req.user.id, 10));
    res.send('success');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
