import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { JwtAccessStrategy } from 'src/commons/auth/jwt-access.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  // controllers: [],
  providers: [JwtAccessStrategy, UserResolver, UserService],
})
export class UserModule {}
