import axios from 'axios';
import 'dotenv/config';

export const getPreferOGTag = async (req, res, next) => {
  try {
    const ogTag = await axios.post('http://crawler:3001', {
      url: req.body.prefer,
    });
    res.locals.og = ogTag.data;
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const checkPersonal = (front, back) => {
  if (front?.length !== 6 || back?.length !== 7) {
    return false;
  }
  return true;
};

export const coverPersonal = (req, res, next) => {
  const [front, back] = req.body.personal.split('-');

  if (!checkPersonal(front, back)) {
    res.status(422).send('주민등록번호를 올바르게 입력해주세요.');
  }
  req.body.personal = `${front}-${'*'.repeat(7)}`;
  next();
};
