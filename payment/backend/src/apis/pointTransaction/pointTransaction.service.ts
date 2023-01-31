import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import {
  PointTransaction,
  POINT_TRANSACTION_STATUS_ENUM,
} from './entities/pointTransaction.entity';

@Injectable()
export class PointTransactionService {
  constructor(
    @InjectRepository(PointTransaction)
    private readonly pointTransactionRepository: Repository<PointTransaction>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async compareImpUid({ impAccessToken, impUid }) {
    try {
      const getPaymentData = await axios({
        url: `https://api.iamport.kr/payments/${impUid}`, // imp_uid 전달
        method: 'get', // GET method
        headers: { Authorization: impAccessToken }, // 인증 토큰 Authorization header에 추가
      });
      const paymentData = getPaymentData.data.response;
      console.log(paymentData);
      return false;
    } catch (e) {
      console.log(e);
    }
  }

  async create({ impUid, amount, currentUser }) {
    const pointTransaction = this.pointTransactionRepository.create({
      impUid,
      amount,
      user: currentUser,
      status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
    });
    await this.pointTransactionRepository.save(pointTransaction);

    const user = await this.userRepository.findOne({
      where: { id: currentUser.id },
    });

    await this.userRepository.update(
      {
        id: user.id,
      },
      {
        point: user.point + amount,
      },
    );
    return pointTransaction;
  }

  async checkDuplicate({ impUid }) {
    const exImpUid = await this.pointTransactionRepository.findOne({
      where: { impUid },
    });

    if (exImpUid) throw new ConflictException('이미 결제 된 아이디입니다.');
  }
}
