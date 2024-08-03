import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { DatabaseService } from 'src/database/database.service';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly databaseService: DatabaseService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET,
    });
  }

  async validate(payload: any) {
    //return {userId:payload.sub,email:payload.email,role:payload.role};
    const user = await this.databaseService.user.findUnique({
      where: { userId: payload.sub },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return {
      userId: user.userId,
      email: user.email,
      role: user.role,
    };
  }
}
