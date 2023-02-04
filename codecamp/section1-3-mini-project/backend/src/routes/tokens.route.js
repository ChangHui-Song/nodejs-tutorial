import express from 'express';

import {
  checkPhone,
  getToken,
  sendTokenToSMS,
  compareTokenInDB,
} from '../middlewares/tokens.middleware.js';

import {
  sendTokenController,
  refreshTokenController,
} from '../controllers/tokens.controller.js';

const router = express.Router();

router.post(
  '/phone',
  checkPhone,
  getToken,
  sendTokenToSMS,
  sendTokenController
);

router.patch('/phone', compareTokenInDB, refreshTokenController);

export default router;
