import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from '../../database/entities';
import { TokenItemResponseDto } from './dto/tokenItemResponse.dto';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  async getAllTokens(): Promise<TokenItemResponseDto[]> {
    return await this.tokenRepository.find();
  }
}
