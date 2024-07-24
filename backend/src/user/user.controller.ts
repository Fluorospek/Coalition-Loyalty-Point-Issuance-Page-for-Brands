import { Controller, UseGuards,Get,Req } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOperation({description:"Fetch details of the registered Brand representative",summary:"Profile"})
  async profile(@Req() req){
    const userId=req.user.userId;
    const email=req.user.email;
    return await this.userService.profile(userId,email);
  }
}
