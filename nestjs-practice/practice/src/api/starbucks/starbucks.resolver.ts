import { Query, Mutation, Resolver, Args } from '@nestjs/graphql';
import { CreateStarbucksInput } from './dto/createStarbucks.input';
import { Starbucks } from './entity/starbucks.entity';
import { StarbucksService } from './starbucks.service';

@Resolver()
export class StarbucksResolver {
  constructor(private readonly starbucksService: StarbucksService) {}

  @Mutation(() => String)
  createStarbucks(
    @Args('createStarbucksInput') createStarbucksInput: CreateStarbucksInput,
  ) {
    console.log(createStarbucksInput);

    return this.starbucksService.create();
  }

  @Query(() => [Starbucks])
  fetchStarbucks() {
    return this.starbucksService.findAll();
  }
}
