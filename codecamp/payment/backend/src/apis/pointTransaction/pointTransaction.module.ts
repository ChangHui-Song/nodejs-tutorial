import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImportService } from '../import/import.service';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { PointTransaction } from './entities/pointTransaction.entity';
import { PointTransactionResolver } from './pointTransaction.resolver';
import { PointTransactionService } from './pointTransaction.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PointTransaction, //
      User,
    ]),
    JwtModule.register({}),
  ],
  providers: [
    PointTransactionResolver, //
    PointTransactionService,
    ImportService,
    UserService,
  ],
})
export class PointTransactionModule {}
