import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { FindManyTransactionParamsDto } from './dto/findManyTransactionParams.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JWTAuthGuard } from 'modules/auth/guards/userJwt.guard';
import { UserDecorator } from 'decorators/user.decorator';
import { TransactionService } from './transaction.service';
import { User } from 'database/entities';
import { Pagination } from 'nestjs-typeorm-paginate';
import { TransactionItemResponseDto } from './dto/transactionItemResponse.dto';
import { TransactionResponseDto } from './dto/transactionResponse.dto';

@Controller('transactions')
@ApiTags('transaction')
@ApiBearerAuth()
@UseGuards(JWTAuthGuard)
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  @ApiResponse({
    status: 200,
    type: TransactionResponseDto,
  })
  async getManyTransactions(
    @Query() queries: FindManyTransactionParamsDto,
    @UserDecorator() user: User,
  ): Promise<Pagination<TransactionItemResponseDto>> {
    return await this.transactionService.getManyTransactionsWithPageable(
      queries,
      user,
    );
  }
}
