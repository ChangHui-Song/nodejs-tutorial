import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { CreateUserInput } from './craeteUser.input';

@InputType()
export class UpdateUserInput extends PartialType(
  OmitType(CreateUserInput, ['password']),
) {}
