import { ConflictException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserService } from '../user.service';

class MockUserRepository {
  mydb = [{ email: 'a@a.com', password: 'password', name: 'merry', age: 28 }];

  findOne({ where: { email } }) {
    const users = this.mydb.filter((user) => user.email === email);
    if (users.length) return users[0];
    return null;
  }

  save({ email, password, name, age }) {
    this.mydb.push({ email, password, name, age });
    return { email, password, name, age };
  }
}

describe('UserService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const userModule = await Test.createTestingModule({
      providers: [
        UserService, //
        {
          provide: getRepositoryToken(User),
          useClass: MockUserRepository,
        },
      ],
    }).compile();

    userService = userModule.get<UserService>(UserService);
  });

  describe('create', () => {
    test('email 검증', async () => {
      const dummyData = {
        email: 'a@a.com',
        password: '1234',
        name: 'John',
        age: 13,
      };

      try {
        await userService.create({ ...dummyData });
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
      }
    });

    test('회원 등록 test', async () => {
      const dummyData = {
        email: 'b@b.com',
        password: '1234',
        name: 'John',
        age: 13,
      };

      const expectedData = {
        email: 'b@b.com',
        password: '1234',
        name: 'John',
        age: 13,
      };

      const result = await userService.create({ ...dummyData });
      expect(result).toStrictEqual(expectedData);
    });
  });
});
