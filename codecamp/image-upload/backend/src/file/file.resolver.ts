import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FileService } from './file.service';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@Resolver()
export class FileResolver {
  constructor(
    private readonly fileService: FileService, //
  ) {}

  @Query(() => String)
  hello() {
    return 'HelloWorld';
  }

  @Mutation(() => [String])
  uploadFile(
    @Args({ name: 'files', type: () => [GraphQLUpload] }) files: FileUpload[],
  ) {
    return this.fileService.upload({ files });
  }
}
