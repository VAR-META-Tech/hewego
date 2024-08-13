import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from '../../database/entities';
import { TokenItemResponseDto } from './dto/tokenItemResponse.dto';
import { TokenTypeEnum } from 'shared/enum';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  async getAllTokens(): Promise<TokenItemResponseDto[]> {
    return await this.tokenRepository.find();
  }

  async getTokenByType(type: TokenTypeEnum): Promise<string> {
    const currentToken = await this.tokenRepository.findOne({
      where: { type },
    });
    if (!currentToken) {
      throw new NotFoundException('Token not found');
    }
    return currentToken.address;
  }
}
