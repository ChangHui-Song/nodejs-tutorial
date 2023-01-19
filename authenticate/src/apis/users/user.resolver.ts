import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/createUser.input';
import { UpdateUserInput } from './dto/updateUser.input';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  fetchUsers() {
    return this.userService.findAll();
  }

  @Query(() => User)
  fetchUser(@Args('userId') id: string) {
    return this.userService.findOne({ id });
  }

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('userId') userId: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    const result = await this.userService.update({
      id: userId,
      updateUserInput,
    });
    console.log('==================');
    console.log('result:', result);
    return result;
  }

  @Mutation(() => User)
  deleteProduct(@Args('userId') userId: string) {
    return this.userService.delete({ id: userId });
  }
}
