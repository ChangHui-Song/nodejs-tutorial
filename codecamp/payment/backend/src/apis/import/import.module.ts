import { Module } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { ImportService } from './import.service';

@Module({
  providers: [
    ImportService, //
    UserService,
  ],
})
export class ImportModule {}
