import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';

export class JwtKakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      callbackURL: process.env.KAKAO_CALLBACK_URL,
    });
  }

  validate(accessToken, refreshToken, profile) {
    console.log('=======================');
    console.log(accessToken);
    console.log('=======================');
    console.log(refreshToken);
    console.log('=======================');
    console.log(profile._json.kakao_account);

    return {
      email: profile._json.kakao_account.email,
      password: 'undefined',
      name: profile._json.kakao_account.profile.nickname,
      age: 0,
    };
  }
}
