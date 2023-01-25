import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

interface IOAuthUser {
  user: Pick<User, 'email' | 'password' | 'name' | 'age'>;
}

@Controller()
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get('/login/google')
  @UseGuards(AuthGuard('google'))
  async loginGoogle(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    let user = await this.userService.findOneByEmail({ email: req.user.email });
    if (!user) {
      user = await this.userService.create({
        email: req.user.email,
        password: req.user.password,
        name: req.user.name,
        age: req.user.age,
      });
    }

    this.authService.setRefreshToken({ user, res });
    res.redirect('http://localhost:5500/frontend/social-login.html');
  }

  @Get('/login/naver')
  @UseGuards(AuthGuard('naver'))
  async loginNaver(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    console.log('test');
    console.log(req.user);
    let user = await this.userService.findOneByEmail({ email: req.user.email });
    console.log('=================user');
    console.log(user);
    if (!user) {
      user = await this.userService.create({
        email: req.user.email,
        password: req.user.password,
        name: req.user.name,
        age: req.user.age,
      });
    }

    this.authService.setRefreshToken({ user, res });
    res.redirect('http://localhost:5500/frontend/social-login.html');
  }
}
