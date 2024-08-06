import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserAuthConfig } from '../../../config/userAuth.config';
import { UserSession } from '../../../database/entities/UserSession.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserJwtStrategy extends PassportStrategy(Strategy, 'user-jwt') {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(UserSession)
    private readonly userSessionRepository: Repository<UserSession>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:
        configService.get<UserAuthConfig>('userAuth').accessTokenSecret || '',
    });
  }

  async validate(payload: { session: string }) {
    const userExist = await this.userSessionRepository
      .createQueryBuilder('userSession')
      .innerJoin('userSession.user', 'user')
      .where('userSession.id = :id', { id: payload.session })
      .andWhere('userSession.expiresAt > :date', { date: new Date() })
      .andWhere('user.isActive = :isActive', { isActive: true })
      .select([
        'user.id',
        'user.email',
        'user.username',
        'user.fullName',
        'user.walletAddress',
        'user.countryId',
        'user.nonce',
        'user.isActive',
        'user.createdAt',
        'userSession.id',
        'userSession.expiresAt',
      ])
      .getOne();

    if (!userExist) throw new UnauthorizedException('Invalid access token');

    return userExist.user;
  }
}
