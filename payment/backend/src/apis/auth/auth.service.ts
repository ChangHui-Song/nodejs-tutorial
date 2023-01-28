import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
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

  async getImpAccessToken() {
    const result = await axios.post('https://api.iamport.kr/users/getToken', {
      imp_key: process.env.IMP_KEY,
      imp_secret: process.env.IMP_SECRET,
    });
    console.log();

    return result.data.response['access_token'];
  }
}
