import { checkPhoneNumber, getToken, sendTokenToSMS } from '../utils/token.js';
import PhoneModel from '../models/Phone.model.js';

export const sendSMSController = async (req, res) => {
  const phone = req.body.phone;

  if (!checkPhoneNumber(phone)) {
    return res.status(403).send('휴대폰 번호가 양식에 맞지 않습니다.');
  }

  const token = getToken(6);
  const exPhoneInfo = await PhoneModel.findOne({ phone });

  if (!exPhoneInfo) {
    await new PhoneModel({ phone, token, isAuth: false }).save();
  } else {
    await PhoneModel.updateOne({ token: exPhoneInfo.token }, { token });
  }

  if (!sendTokenToSMS(phone, token)) {
    res.status(500).send('메세지 발송에 실패했습니다.');
  }
  return res.send(`${phone}으로 인증 문자가 전송되었습니다.`);
};

export const compareToken = async (req, res) => {
  const { phone, token } = req.body;
  const exPhoneInfo = await PhoneModel.findOne({ phone });

  if (!exPhoneInfo || token !== exPhoneInfo.token) {
    return res.status(404).send('false');
  }
  await exPhoneInfo.updateOne({ isAuth: true });
  return res.send('true');
};
