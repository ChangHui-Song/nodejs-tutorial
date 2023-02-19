import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardService } from './board.service';
import { CreateBoardInput } from './dto/createBoard.input';
import { UpdateBoardInput } from './dto/updateBoard.input';
import { Board } from './entities/board.entity';

@Resolver()
export class BoardResolver {
  constructor(private readonly boardService: BoardService) {}

  @Query(() => [Board])
  fetchBoards() {
    return this.boardService.findAll();
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
  createBoard(@Args('createBoardInput') createBoardInput: CreateBoardInput) {
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
