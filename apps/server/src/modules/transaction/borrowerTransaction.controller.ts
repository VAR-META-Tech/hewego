import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JWTAuthGuard } from 'modules/auth/guards/userJwt.guard';
import { UserDecorator } from 'decorators/user.decorator';
import { User } from 'database/entities';
import { Pagination } from 'nestjs-typeorm-paginate';

import { BorrowerTransactionResponseDto } from './dto/borrowrTransactionResponse.dto';
import { BorrowerTransactionItemResponseDto } from './dto/borrowerTransactionItemResponse.dto';
import { FindManyBorrowerTransactionParams } from './dto/findManyBorrowerTransactionParams.dto';

@Controller('borrower-transactions')
@ApiTags('transaction')
@ApiBearerAuth()
@UseGuards(JWTAuthGuard)
export class BorrowerTransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('/')
  /**
   * @deprecated will be removed soon
   */
  @ApiResponse({
    status: 200,
    type: BorrowerTransactionResponseDto,
  })
  async getBorrowerTransactionHistories(
    @Query() queries: FindManyBorrowerTransactionParams,
    @UserDecorator() user: User,
  ): Promise<Pagination<BorrowerTransactionItemResponseDto>> {
    return await this.transactionService.getBorrowerTransactionHistoriesWithPageable(
      queries,
      user,
    );
  }
}
