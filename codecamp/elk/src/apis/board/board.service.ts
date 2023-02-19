import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';
// import { User } from '../user/entities/user.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  async findAll() {
    return await this.boardRepository.find();
  }

  async findOne(id: string) {
    return await this.boardRepository.findOne({
      where: { id },
    });
  }

  async count() {
    return await this.boardRepository.count();
  }

  async create({ createBoardInput }) {
    const { writer, title, contents } = createBoardInput;

    return await this.boardRepository.save({
      title,
      contents,
      user: { id: writer },
    });
  }

  async update({ id, updateBoardInput }) {
    const newBoard = {
      id,
      ...updateBoardInput,
    };

    return await this.boardRepository.save(newBoard);
  }

  async delete({ id }) {
    const result = await this.boardRepository.softDelete({ id });

    return result.affected ? true : false;
  }
}
