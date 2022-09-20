const express = require('express');

const { isLoggedIn } = require('./middlewares');
const User = require('../models/user');
const { addFollowing } = require('../controllers/user');

const router = express.Router();

router.post('/:id/follow', isLoggedIn, addFollowing);

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

router.post('/profile/:newNick', async (req, res, next) => {
  try {
    await User.update(
      { nick: req.params.newNick },
      { where: { id: req.user.id } }
    );
    console.log(req.user.nick);
    res.redirect('/');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
