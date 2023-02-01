import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

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

    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/;`);
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

  async loginOauth({ req, res }) {
    let user = await this.userService.findOneByEmail({ email: req.user.email });

    if (!user) {
      user = await this.userService.create(req.user);
    }
    this.setRefreshToken({ user, res });
    res.redirect('http://localhost:5500/frontend/social-login.html');
  }
}
