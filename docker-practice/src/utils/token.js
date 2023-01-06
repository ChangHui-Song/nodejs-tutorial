import coolsmsSDK from 'coolsms-node-sdk';
import 'dotenv/config';

export const getToken = (count) =>
  String(Math.floor(Math.random() * 10 ** count)).padStart(count, '0');

export const checkPhoneNumber = (phone) => {
  if (phone === undefined || (phone.length !== 11 && phone.length !== 10)) {
    return false;
  }
  return true;
};

export const sendTokenToSMS = async (phone, token) => {
  const Coolsms = coolsmsSDK.default;
  const messageService = new Coolsms(
    process.env.SMS_API_KEY,
    process.env.SMS_API_SECRET
  );
  const result = await messageService.sendOne({
    to: phone,
    from: process.env.SMS_SENDER,
    text: `인증번호는 ${token}입니다.`,
  });
  return result;
};
