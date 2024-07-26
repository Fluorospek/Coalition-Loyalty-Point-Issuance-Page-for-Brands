import { Controller, UseGuards,Get,Body,Post,Req } from '@nestjs/common';
import { LoyaltyService } from './loyalty.service';
import { ApiOperation, ApiTags} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { IssueDto } from './dto/issue.dto';
import { ManageDto } from './dto/manage.dto';
import { DistributeDto } from './dto/distribute.dto';

@ApiTags('Loyalty')
@Controller('loyalty')
export class LoyaltyController {
  constructor(private readonly loyaltyService: LoyaltyService) {}

  @UseGuards(JwtAuthGuard)
  @Get('manage')
  @ApiOperation({description:"Brand Representative lists issued loyalty points",summary:"List Loyalty Points issued"})
  async manage(@Req() req, @Body() ManageDto:ManageDto){
    const userId=req.user.userId;
    return await this.loyaltyService.manage(userId,ManageDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('issue')
  @ApiOperation({description:"Brand Representative issues loyalty points",summary:"Issue Loyalty Points"})
  async issue(@Req() req, @Body() IssueDto:IssueDto){
    const userId=req.user.userId;
    const email=req.user.email;
    return await this.loyaltyService.issue(userId,email,IssueDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('brand-tokens')
  @ApiOperation({description:"Brand Representative can view if token has been issued",summary:"Get Brand Token Details"})
  async brandTokens(@Req() req){
    const userId=req.user.userId;
    return await this.loyaltyService.brandToken(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('distribute')
  @ApiOperation({description:"Brand Representative distributes loyalty points",summary:"Distribute Loyalty Points"})
  async distribute(@Req() req,@Body() DistributeDto:DistributeDto){
    const userId=req.user.userId;
    return await this.loyaltyService.distribute(userId,DistributeDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('transactions')
  @ApiOperation({description:"Brand Representative views transaction history",summary:"View Transaction History"})
  async transactions(@Req() req, @Body() ManageDto:ManageDto){
    const userId=req.user.userId;
    return await this.loyaltyService.transactions(userId,ManageDto);
  }
}
