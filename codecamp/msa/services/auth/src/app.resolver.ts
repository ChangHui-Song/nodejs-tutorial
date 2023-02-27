import { AppService } from './app.service';
import { Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Query(() => String)
  fetchUser() {
    return 'fetch user data';
  }

  @Mutation(() => String)
  login() {
    return 'login 성공';
  }
}
