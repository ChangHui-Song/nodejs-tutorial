import nodemailer from 'nodemailer';
import 'dotenv/config';

import { getToday } from './date.utils.js';

export const checkValidationEamil = (email) => {
  if (email === undefined || !email.includes('@')) {
    console.log('이메일이 올바르지 않습니다.');
    return false;
  }
  return true;
};

export const getWelcomeTemplate = ({ name, phone, prefer }) => {
  return `
    <html>
      <body>
        <h1>${name}님 가입을 환영합니다.</h1>
        <hr />
        <div>이름: ${name}</div>
        <div>휴대폰: ${phone}</div>
        <div>사이트: ${prefer}</div>
        <div>가입일: ${getToday()}</div>
      </body>
    </html>
  `;
};

export const sendTemplateToEmail = async (email, template) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const result = await transporter.sendMail({
    from: process.env.EMAIL_SENDER,
    to: email,
    subject: '가입을 축하합니다!',
    html: template,
  });

  return result;
};
