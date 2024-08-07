/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ApiConfigService } from 'shared/services/api-config.service';
import { TokenPayloadType } from '../type/tokenPayload.type';
import { UserService } from 'modules/user/user.service';
import { TokenType } from 'constants/token-type';

@Injectable()
export class UserJwtStrategy extends PassportStrategy(Strategy, 'user-jwt') {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ApiConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.authConfig.privateKey,
    });
  }

  async validate(payload: TokenPayloadType): Promise<any> {
    if (payload.sub.type !== TokenType.ACCESS_TOKEN) {
      throw new UnauthorizedException('Invalid access token');
    }

    const user = await this.userService.getUserById(payload.sub.userId);
    if (!user) {
      throw new UnauthorizedException('Invalid access token');
    }
    return user;
  }
}
