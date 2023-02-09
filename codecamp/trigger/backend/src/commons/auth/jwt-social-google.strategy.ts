import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

export class JwtGoogleStratgy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  validate(accessToken: string, refreshToken: string, profile: any) {
    console.log('=======================');
    console.log(accessToken);
    console.log('=======================');
    console.log(refreshToken);
    console.log('=======================');
    console.log(profile);

    return {
      email: profile.emails[0].value,
      password: 'abcde',
      name: profile.displayName,
      age: 0,
    };
  }
}
