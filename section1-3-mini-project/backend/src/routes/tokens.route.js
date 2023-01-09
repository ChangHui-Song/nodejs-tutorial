import express from 'express';

import {
  checkPhone,
  getToken,
  sendTokenToSMS,
} from '../middlewares/tokens.middleware.js';

import {
  sendTokenController,
  compareToken,
} from '../controllers/tokens.controller.js';

const router = express.Router();

router.post(
  '/phone',
  checkPhone,
  getToken,
  sendTokenToSMS,
  sendTokenController
);

router.patch('/phone', compareToken);

export default router;
