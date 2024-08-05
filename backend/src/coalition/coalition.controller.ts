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
  @ApiOperation({description:"Admin can set up the Coalition",summary:"Coalition Setup"})
  @Roles(UserRole.ADMIN)
  async setup(@Req() req, @Body() CoalitionDto:CoalitionDto){
    const userId=req.user.userId;
    const email=req.user.email;
    return await this.coalitionService.setup(userId,email,CoalitionDto);
  }

  @ApiBearerAuth()
  @Get('tokens')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({description:"Admin can view issued tokens by all the brands",summary:"View Tokens"})
  @Roles(UserRole.ADMIN)
  async tokens(@Req() req){
    const userId=req.user.userId;
    return await this.coalitionService.tokens(userId);
  }

  @ApiBearerAuth()
  @Get('details')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({description:"Admin can view details of the coalition",summary:"Coalition Details"})
  @Roles(UserRole.ADMIN)
  async details(@Req() req){
    const userId=req.user.userId;
    return await this.coalitionService.details(userId);
  }

  @ApiBearerAuth()
  @Get('token/details')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({description:"Admin can view details of the token",summary:"Token Details"})
  @Roles(UserRole.ADMIN)
  async tokenDetails(@Req() req){
    const userId=req.user.userId;
    return await this.coalitionService.tokenDetails(userId);
  }

  @ApiBearerAuth()
  @Get('brand/details')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({description:"Admin can view details of the brand",summary:"Brand Details"})
  @Roles(UserRole.ADMIN)
  async brandDetails(@Req() req){
    const userId=req.user.userId;
    return await this.coalitionService.brandDetails(userId);
  }
}
