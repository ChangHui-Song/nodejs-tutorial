import {
  ConflictException,
  HttpException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ImportService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, //
  ) {}

  async getImpAccessToken() {
    try {
      const result = await axios.post('https://api.iamport.kr/users/getToken', {
        imp_key: process.env.IMP_KEY,
        imp_secret: process.env.IMP_SECRET,
      });

      return result.data.response['access_token'];
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.response.data.message,
        error.response.status,
      );
    }
  }

  async checkPaid({ impAccessToken, amount, impUid }) {
    try {
      const result = await axios.get(
        `https://api.iamport.kr/payments/${impUid}`,
        {
          headers: { Authorization: impAccessToken },
        },
      );

      if (result.data.response.status !== 'paid')
        throw new ConflictException('결제 내역이 존재하지 않습니다.');
      if (result.data.response.amount !== amount) {
        throw new UnprocessableEntityException('결제 금액이 잘못되었습니다.');
      }
      return result;
    } catch (error) {
      if (error?.response?.data?.message) {
        throw new HttpException(
          error.response.data.message,
          error.response.status,
        );
      } else {
        throw error;
      }
    }
  }
}
