import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async find() {
    return await this.userRepository.find();
  }

  async findOneById({ id }) {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  async findOneByEmail({ email }) {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  async create({ email, password, name, age }) {
    const user = await this.findOneByEmail({ email });

    if (user) throw new ConflictException('already registed email');

    return this.userRepository.save({
      email,
      password,
      name,
      age,
    });
  }

  async update({ id, updateUserInput }) {
    const exUserInfo = await this.findOneById({ id });
    if (updateUserInput.password)
      updateUserInput.password = await bcrypt.hash(
        updateUserInput.password,
        10,
      );
    const newUserInfo = { ...exUserInfo, ...updateUserInput };
    return this.userRepository.save(newUserInfo);
  }

  async delete({ id }) {
    return await this.userRepository.softDelete({ id });
  }
}
