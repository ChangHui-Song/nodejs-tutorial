import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

export class JwtRefreshStratgy extends PassportStrategy(
  Strategy,
  'RefreshGuard',
) {
  constructor() {
    super({
      jwtFromRequest: (req: any) => {
        const refreshToken = req.headers.cookie;
        return refreshToken?.split('=')[1];
      },
      secretOrKey: 'RefreshKey',
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
