import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

import { BoardService } from './board.service';
import { CreateBoardInput } from './dto/createBoard.input';
import { UpdateBoardInput } from './dto/updateBoard.input';
import { Board } from './entities/board.entity';

@Resolver()
export class BoardResolver {
  constructor(
    private readonly boardService: BoardService,
    private readonly elasticsearchService: ElasticsearchService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  @Query(() => [Board])
  async fetchBoards(
    @Args('search') search: string, //
  ) {
    // redis search
    const boardsCache = await this.cacheManager.get(`boards:${search}`);
    if (boardsCache) return boardsCache;

    // elasticsearch practice
    const result = await this.elasticsearchService.search({
      index: 'practice01',
      query: { match: { title: search } },
    });

    // result parsing
    const boards = result.hits.hits.map((el: any) => ({
      id: el._source.id,
      title: el._source.title,
      contents: el._source.contents,
    }));

    // redis cache set
    this.cacheManager.set(`boards:${search}`, boards, { ttl: 0 });

    return boards;

    // return this.boardService.findAll();
  }

  @Query(() => Board)
  fetchBoard(
    @Args('boardId') boardId: string, //
  ) {
    return this.boardService.findOne(boardId);
  }

  @Query(() => Int)
  fetchBoardsCount() {
    return this.boardService.count();
  }

  @Mutation(() => Board)
  async createBoard(
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
  ) {
    //elasticsearch practice
    // const result = await this.elasticsearchService.create({
    //   id: 'myid',
    //   index: 'board',
    //   document: {
    //     ...createBoardInput,
    //   },
    // });

    // return result;
    return this.boardService.create({ createBoardInput });
  }

  @Mutation(() => Board)
  updateBoard(
    @Args('boardId') boardId: string,
    @Args('updateBoardInput') updateBoardInput: UpdateBoardInput,
  ) {
    return this.boardService.update({ id: boardId, updateBoardInput });
  }

  @Mutation(() => String)
  deleteBoard(@Args('id') id: string) {
    const isDeleted = this.boardService.delete({ id });
    return isDeleted ? '삭제되었습니다.' : '삭제에 실패했습니다.';
  }
}
