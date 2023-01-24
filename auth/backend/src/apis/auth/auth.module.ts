import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAccessStratgy } from 'src/commons/auth/jwt-access.strategy';
import { JwtRefreshStratgy } from 'src/commons/auth/jwt-refresh.strategy';
import { JwtGoogleStratgy } from 'src/commons/auth/jwt-social-google.strategy';

import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), //
    JwtModule.register({}),
  ],
  providers: [
    AuthResolver,
    AuthService,
    UserService,
    JwtAccessStratgy,
    JwtRefreshStratgy,
    JwtGoogleStratgy,
  ],
  controllers: [
    AuthController, //
  ],
})
export class AuthModule {}
