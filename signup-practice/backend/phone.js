import coolsms from 'coolsms-node-sdk';
import 'dotenv/config';

export function checkValidationPhone(phoneNumber) {
  if (phoneNumber.length !== 11 && phoneNumber.length !== 10) {
    return false;
  }

  if (phoneNumber.match(/[^0-9]/g)?.length) {
    return false;
  }

  return true;
}

export function getToken() {
  const count = 6;
  if (count === undefined) {
    console.log('count is undefined');
    return null;
  } else if (count <= 0) {
    console.log('count is less then 0');
    return null;
  } else if (count >= 10) {
    console.log('count is greater then 10');
    return null;
  }
  return String(Math.floor(Math.random() * 10 ** count)).padStart(count, '0');
}

export async function sendTokenToSMS(phoneNumber, token) {
  const mysms = coolsms.default;

  const messageService = new mysms(
    process.env.SMS_API_KEY,
    process.env.SMS_API_SECRET
  );
  const result = await messageService.sendOne({
    to: phoneNumber,
    from: process.env.SMS_SENDER,
    text: `[송창희 서비스] 안녕하세요 요청하신 인증번호는 [${token}] 입니다.`,
  });
  console.log(result);
  return result;
}
