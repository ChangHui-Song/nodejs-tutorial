import express from 'express';

import UserModel from '../models/user.model.js';
import { compareTokenInDB } from '../middlewares/tokens.middleware.js';
import {
  getPreferOGTag,
  coverPersonal,
} from '../middlewares/user.middleware.js';
import {
  checkValidationEamil,
  getWelcomeTemplate,
  sendTemplateToEmail,
} from '../utils/email.utils.js';

const router = express.Router();

router.post(
  '/',
  compareTokenInDB,
  coverPersonal,
  getPreferOGTag,
  async (req, res) => {
    const userInfo = { ...req.body, ...res.locals };
    const result = new UserModel(userInfo);
    result.save();
    if (checkValidationEamil(userInfo.email)) {
      const template = getWelcomeTemplate(userInfo);
      sendTemplateToEmail(userInfo.email, template);
    }
    res.send(result._id);
  }
);

export default router;
