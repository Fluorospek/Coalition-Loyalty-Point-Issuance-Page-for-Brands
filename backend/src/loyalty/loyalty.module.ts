import { Module } from '@nestjs/common';
import { LoyaltyService } from './loyalty.service';
import { LoyaltyController } from './loyalty.controller';
import { DatabaseModule } from 'src/database/database.module';
import { HttpModule } from '@nestjs/axios';
import { BrandService } from 'src/brand/brand.service';
import { BrandModule } from 'src/brand/brand.module';

@Module({
  imports:[DatabaseModule,HttpModule],
  controllers: [LoyaltyController],
  providers: [LoyaltyService,BrandService],
})
export class LoyaltyModule {}
