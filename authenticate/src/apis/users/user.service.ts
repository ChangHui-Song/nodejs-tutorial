import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll() {
    return await this.userRepository.find({
      select: {
        id: true,
        email: true,
        name: true,
        age: true,
      },
    });
  }

  async findOneById({ id }) {
    return await this.userRepository.findOneBy({
      id,
    });
  }

  async findOneByEmail({ email }) {
    return await this.userRepository.findOneBy({
      email,
    });
  }

  async create({ email, password, name, age }) {
    const exUser = await this.userRepository.findOne({ where: { email } });

    if (exUser) throw new ConflictException('이미 등록된 이메일 입니다.');

    return await this.userRepository.save({
      email,
      password,
      name,
      age,
    });
  }

  async update({ id, updateUserInput }) {
    const updatedUserInfo = {
      id,
      ...updateUserInput,
    };
    return await this.userRepository.save(updatedUserInfo);
  }

  async delete({ id }) {
    return await this.userRepository.softDelete({ id });
  }
}
