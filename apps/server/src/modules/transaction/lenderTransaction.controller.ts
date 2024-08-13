import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { FindManyLenderTransactionParamsDto } from './dto/findManyLenderTransactionParams.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JWTAuthGuard } from 'modules/auth/guards/userJwt.guard';
import { UserDecorator } from 'decorators/user.decorator';
import { User } from 'database/entities';
import { Pagination } from 'nestjs-typeorm-paginate';
import { LenderTransactionItemResponseDto } from './dto/lenderTransactionItemResponse.dto';
import { LenderTransactionResponseDto } from './dto/lenderTransactionResponse.dto';

@Controller('lender-transactions')
@ApiTags('transaction')
@ApiBearerAuth()
@UseGuards(JWTAuthGuard)
export class LenderTransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('/')
  @ApiResponse({
    status: 200,
    type: LenderTransactionResponseDto,
  })
  async getLenderTransactionHistories(
    @Query() queries: FindManyLenderTransactionParamsDto,
    @UserDecorator() user: User,
  ): Promise<Pagination<LenderTransactionItemResponseDto>> {
    return await this.transactionService.getLenderTransactionHistoriesWithPageable(
      queries,
      user,
    );
  }
}
