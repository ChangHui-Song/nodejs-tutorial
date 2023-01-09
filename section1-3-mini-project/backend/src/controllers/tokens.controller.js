import TokenModel from '../models/token.model.js';

export const sendTokenController = async (req, res) => {
  try {
    const { phone } = req.body;
    const { token } = res.locals;

    const exTokenInfo = await TokenModel.findOne({ phone });

    if (!exTokenInfo) {
      await new TokenModel({ phone, token, isAuth: false }).save();
    } else {
      await TokenModel.updateOne({ token: exTokenInfo.token }, { token });
    }

    return res.send(`${phone}으로 인증 문자가 전송되었습니다.`);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const compareToken = async (req, res) => {
  try {
    const { phone, token } = req.body;
    const exTokenInfo = await TokenModel.findOne({ phone });

    if (!exTokenInfo || token !== exTokenInfo.token) {
      return res.status(422).send('false');
    }
    await exTokenInfo.updateOne({ isAuth: true });

    return res.send('true');
  } catch (error) {
    console.error(error);
    next(error);
  }
};
