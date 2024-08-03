import { Controller, UseGuards } from '@nestjs/common';
import { CoalitionService } from './coalition.service';
import { Post, Body, Req,Get } from '@nestjs/common';
import { CoalitionDto } from './dto/coalition.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/roles.decorator';
import { UserRole } from 'src/user-role.enum';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('coalition')
@ApiTags('Coalition')
@UseGuards(RolesGuard)
export class CoalitionController {
  constructor(private readonly coalitionService: CoalitionService) {}

  //done
  @ApiBearerAuth()
  @Post('setup')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({description:"Admin sets up the Coalition",summary:"Coalition Setup"})
  @Roles(UserRole.ADMIN)
  async setup(@Req() req, @Body() CoalitionDto:CoalitionDto){
    const userId=req.user.userId;
    const email=req.user.email;
    return await this.coalitionService.setup(userId,email,CoalitionDto);
  }

  @ApiBearerAuth()
  @Get('tokens')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({description:"Admin views issued tokens by all the brands",summary:"View Tokens"})
  @Roles(UserRole.ADMIN)
  async tokens(@Req() req){
    const userId=req.user.userId;
    return await this.coalitionService.tokens(userId);
  }
}
