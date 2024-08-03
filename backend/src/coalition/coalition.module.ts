import { Module } from '@nestjs/common';
import { CoalitionService } from './coalition.service';
import { CoalitionController } from './coalition.controller';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseService } from 'src/database/database.service';
import { DatabaseModule } from 'src/database/database.module';
import { HttpModule, HttpService } from '@nestjs/axios';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[DatabaseModule,HttpModule,AuthModule],
  controllers: [CoalitionController],
  providers: [CoalitionService],
})
export class CoalitionModule {}
