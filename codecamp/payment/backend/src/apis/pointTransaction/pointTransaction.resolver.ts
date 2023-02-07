import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user.param';
import { ImportService } from '../import/import.service';
import { PointTransaction } from './entities/pointTransaction.entity';
import { PointTransactionService } from './pointTransaction.service';

@Resolver()
export class PointTransactionResolver {
  constructor(
    private readonly pointTransactionService: PointTransactionService,
    private readonly importService: ImportService,
  ) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => PointTransaction)
  async createPointTransaction(
    @Args('impUid') impUid: string, //
    @Args('amount') amount: number,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    const impAccessToken = await this.importService.getImpAccessToken();
    await this.importService.checkPaid({
      impAccessToken,
      amount,
      impUid,
    });

    await this.pointTransactionService.checkDuplicate({ impUid });

    return this.pointTransactionService.create({
      impUid,
      amount,
      currentUser,
    });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => PointTransaction)
  async cancelPointTransaction(
    @Args('impUid') impUid: string,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    await this.pointTransactionService.checkAlreadyCanceled({ impUid });
    await this.pointTransactionService.checkHasCancelablePoint({
      impUid,
      currentUser,
    });
    const token = await this.importService.getImpAccessToken();
    const canceledAmount = this.importService.cancel({
      impUid,
      token,
    });
    await this.pointTransactionService.cancel({
      impUid,
      amount: canceledAmount,
      currentUser,
    });
  }
}
