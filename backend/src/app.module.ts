import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { BrandModule } from './brand/brand.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [DatabaseModule, AuthModule, BrandModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
