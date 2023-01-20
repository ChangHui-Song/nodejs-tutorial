import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/createUser.input';
import { UpdateUserInput } from './dto/updateUser.input';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    const hashedPassword = await bcrypt.hash(createUserInput.password, 10);
    return this.userService.create({
      ...createUserInput,
      password: hashedPassword,
    });
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
    return result;
  }

  @Mutation(() => User)
  deleteProduct(@Args('userId') userId: string) {
    return this.userService.delete({ id: userId });
  }
}
