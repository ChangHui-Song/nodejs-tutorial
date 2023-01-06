import express from 'express';
import {
  sendSMSController,
  compareToken,
} from '../controllers/phone.controller.js';

const router = express.Router();

router.post('/', sendSMSController);
router.patch('/', compareToken);

export default router;
