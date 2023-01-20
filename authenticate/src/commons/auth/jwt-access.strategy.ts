import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'guard') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'AccessKey',
    });
  }

  validate(payload: any) {
    console.log('payload: ', payload);
    return {
      email: payload.email,
      id: payload.sub,
    };
  }
}
