import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';

export class JwtKakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      callbackURL: process.env.KAKAO_CALLBACK_URL,
      scope: ['account_email', 'profile_nickname'],
    });
  }

  validate(accessToken: string, refreshToken: string, profile: any) {
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
