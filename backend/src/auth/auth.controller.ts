import { Controller,Post,Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterBrandRepDto } from './dto/register.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginBrandRepDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({description:"Brand Reprasentative registers with email"})
  async register(@Body() RegisterBrandRepDto:RegisterBrandRepDto){
    return await this.authService.register(RegisterBrandRepDto)
  }

  @Post('login')
  @ApiOperation({description:"Brand Representative logs in using email"})
  async login(@Body() LoginBrandRepDto:LoginBrandRepDto){
    return await this.authService.login(LoginBrandRepDto)
  }
}
