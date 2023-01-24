import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import 'dotenv/config';

export class JwtGoogleStratgy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_KEY,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: 'http://localhost:3000/login/google',
      scope: ['email', 'profile'],
    });
  }

  validate(accessToken, refreshToken, profile) {
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
