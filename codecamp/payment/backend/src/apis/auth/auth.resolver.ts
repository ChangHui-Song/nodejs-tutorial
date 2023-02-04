import { UnprocessableEntityException, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  GqlAuthAccessGuard,
  GqlAuthRefreshGuard,
} from 'src/commons/auth/gql-auth.guard';
import { CurrentUser } from 'src/commons/auth/gql-user.param';
import * as bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { User } from '../user/entities/user.entity';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => User)
  fetchLoginUser(@CurrentUser() currentUser: any) {
    return this.userService.findOneById(currentUser);
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  async updateUserPwd(
    @CurrentUser() currentUser: any,
    @Args('password') password: string,
  ) {
    await this.userService.update({
      id: currentUser.id,
      updateUserInput: { password },
    });

    return '변경되었습니다.';
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  async deleteLoginUser(@CurrentUser() currentUser: any) {
    await this.userService.delete({ id: currentUser.id });
    return '삭제되었습니다.';
  }

  @Mutation(() => String)
  async login(
    @Args('email') email: string, //
    @Args('password') password: string,
    @Context() context: any,
  ) {
    const exUser = await this.userService.findOneByEmail({ email });

    if (!exUser)
      throw new UnprocessableEntityException('이메일이 존재하지 않습니다.');

    const isAuth = await bcrypt.compare(password, exUser.password);

    if (!isAuth)
      throw new UnprocessableEntityException('비밀번호가 일치하지 않습니다.');

    this.authService.setRefreshToken({ user: exUser, res: context.req.res });

    return this.authService.getAccessToken({ user: exUser });
  }

  @UseGuards(GqlAuthRefreshGuard)
  @Mutation(() => String)
  restoreAccessToken(@CurrentUser() currentUser: any) {
    return this.authService.getAccessToken({ user: currentUser });
  }
}
