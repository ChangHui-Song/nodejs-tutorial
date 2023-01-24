import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  setRefreshToken({ user, res }) {
    const refreshToken = this.jwtService.sign(
      {
        email: user.email,
        sub: user.id,
      },
      {
        secret: 'RefreshKey',
        expiresIn: '2w',
      },
    );

    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}`);
  }

  getAccessToken({ user }) {
    return this.jwtService.sign(
      {
        email: user.email,
        sub: user.id,
      },
      {
        secret: 'AccessKey',
        expiresIn: '1h',
      },
    );
  }
}
