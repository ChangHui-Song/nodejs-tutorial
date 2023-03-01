import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';

import { CreateUserInput } from './dto/craeteUser.input';
import { UpdateUserInput } from './dto/updateUser.input';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService, //
  ) {}

  @Query(() => [User])
  fetchUsers() {
    return this.userService.find();
  }

  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput, //
  ) {
    createUserInput.password = await bcrypt.hash(createUserInput.password, 10);
    return this.userService.create(createUserInput);
  }

  @Mutation(() => User)
  updateUser(
    @Args('userId') userId: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput, //
  ) {
    return this.userService.update({ id: userId, updateUserInput });
  }

  @Mutation(() => String)
  deleteUser(
    @Args('userId') userId: string, //
  ) {
    return this.userService.delete({ id: userId });
  }
}
