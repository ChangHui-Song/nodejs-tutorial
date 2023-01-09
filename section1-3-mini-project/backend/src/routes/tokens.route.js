import express from 'express';

import {
  checkPhone,
  getToken,
  sendTokenToSMS,
} from '../../middlewares/tokens.middleware.js';

import { sendTokenController } from '../controllers/tokens.controller.js';

const router = express.Router();

router.post(
  '/phone',
  checkPhone,
  getToken,
  sendTokenToSMS,
  sendTokenController
);

export default router;
