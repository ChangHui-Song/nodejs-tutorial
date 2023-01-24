import { ObjectType, PickType } from '@nestjs/graphql';
import { User } from 'src/apis/user/entities/user.entity';

@ObjectType()
export class AuthUser extends PickType(User, ['id', 'email'] as const) {}
