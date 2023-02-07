import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { DataSource, Repository } from 'typeorm';
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

    private readonly dataSource: DataSource,
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

  async create({
    impUid,
    amount,
    currentUser,
    status = POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
  }) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');

    // query transaction
    try {
      const pointTransaction = this.pointTransactionRepository.create({
        impUid,
        amount,
        user: currentUser,
        status,
      });
      // await this.pointTransactionRepository.save(pointTransaction);
      await queryRunner.manager.save(pointTransaction);

      // const user = await this.userRepository.findOne({
      //   where: { id: currentUser.id },
      // });

      const user = await queryRunner.manager.findOne(User, {
        where: { id: currentUser.id },
        lock: { mode: 'pessimistic_write' },
      });

      // await this.userRepository.update(
      //   {
      //     id: user.id,
      //   },
      //   {
      //     point: user.point + amount,
      //   },
      // );

      const updatedUser = this.userRepository.create({
        ...user,
        point: user.point + amount,
      });
      await queryRunner.manager.save(updatedUser);

      await queryRunner.commitTransaction();

      return pointTransaction;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async cancel({ impUid, amount, currentUser }) {
    return await this.create({
      impUid,
      amount: -amount,
      currentUser,
      status: POINT_TRANSACTION_STATUS_ENUM.CANCEL,
    });
  }

  async checkDuplicate({ impUid }) {
    const exImpUid = await this.pointTransactionRepository.findOne({
      where: { impUid },
    });

    if (exImpUid) throw new ConflictException('이미 결제 된 아이디입니다.');
  }

  async checkAlreadyCanceled({ impUid }) {
    const user = await this.pointTransactionRepository.findOne({
      where: {
        impUid,
        status: POINT_TRANSACTION_STATUS_ENUM.CANCEL,
      },
    });
    if (user) {
      throw new ConflictException('이미 취소된 결제 내역입니다.');
    }
  }

  async checkHasCancelablePoint({ impUid, currentUser }) {
    const pointTransaction = await this.pointTransactionRepository.findOne({
      where: {
        impUid,
        user: { id: currentUser.id },
        status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
      },
    });

    if (!pointTransaction) {
      throw new UnprocessableEntityException('결제 기록이 존재하지 않습니다.');
    }

    const user = await this.userRepository.findOne({
      where: { id: currentUser.id },
    });
    if (user.point < pointTransaction.amount) {
      throw new UnprocessableEntityException('포인트가 부족합니다.');
    }
  }
}
