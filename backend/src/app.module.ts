import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { BrandModule } from './brand/brand.module';

@Module({
  imports: [DatabaseModule, AuthModule, BrandModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
