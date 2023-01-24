import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtAccessStratgy extends PassportStrategy(Strategy, 'guard') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'AccessKey',
    });
  }
  validate(payload: any) {
    console.log(payload);
    return {
      id: payload.sub,
      email: payload.email,
    };
  }
}
