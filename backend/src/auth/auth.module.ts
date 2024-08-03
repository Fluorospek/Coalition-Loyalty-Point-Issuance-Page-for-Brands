import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/database/database.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports:[
    HttpModule,
    DatabaseModule,
    PassportModule,
    JwtModule.register({
      secret:process.env.SECRET,
      signOptions:{
        expiresIn:'1h'
      }
    })
  ], 
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  exports:[JwtModule]
})
export class AuthModule {}
