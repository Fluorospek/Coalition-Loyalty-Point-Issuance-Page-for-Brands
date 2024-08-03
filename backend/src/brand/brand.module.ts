import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[DatabaseModule,JwtModule,AuthModule],
  controllers: [BrandController],
  providers: [BrandService],
})
export class BrandModule {}
