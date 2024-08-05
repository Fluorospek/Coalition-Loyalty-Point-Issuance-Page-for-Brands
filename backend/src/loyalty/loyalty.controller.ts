import { Controller, UseGuards,Get,Body,Post,Req } from '@nestjs/common';
import { LoyaltyService } from './loyalty.service';
import { ApiBearerAuth, ApiOperation, ApiTags} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { IssueDto } from './dto/issue.dto';
import { DefineDto } from './dto/define.dto';
import { IssueV2Dto } from './dto/issuev2.dto';
import { DistributeDto } from './dto/distribute.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/roles.decorator';
import { UserRole } from 'src/user-role.enum';
import { Role } from '@prisma/client';

@ApiTags('Loyalty')
@Controller('loyalty')
@UseGuards(RolesGuard)
export class LoyaltyController {
  constructor(private readonly loyaltyService: LoyaltyService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('manage')
  @ApiOperation({description:"Brand Representative lists issued loyalty points",summary:"List Loyalty Points issued"})
  async manage(@Req() req){
    const userId=req.user.userId;
    return await this.loyaltyService.manage(userId);
  }

  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  // @Post('issue')
  // @ApiOperation({description:"Brand Representative issues loyalty points",summary:"Issue Loyalty Points"})
  // async issue(@Req() req, @Body() IssueDto:IssueDto){
  //   const userId=req.user.userId;
  //   const email=req.user.email;
  //   return await this.loyaltyService.issue(userId,email,IssueDto);
  // }

  //done
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('transactions')
  @ApiOperation({description:"Brand Representative views transactions",summary:"View Transactions"})
  async transactions(@Req() req){
    const userId=req.user.userId;
    return await this.loyaltyService.transactions(userId);
  }

  //done
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('brand-token')
  @ApiOperation({description:"Brand Representative can view brand Token details",summary:"Brand Token Details"})
  async brandToken(@Req() req){
    const userId=req.user.userId;
    return await this.loyaltyService.brandToken(userId);
  }

  //done
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('define')
  @Roles(UserRole.ADMIN)
  @ApiOperation({description:"Admin can define Loyalty point details",summary:" Admin Define Loyalty Point Details"})
  async define(@Req() req,@Body() DefineDto:DefineDto){
    const userId=req.user.userId;
    return await this.loyaltyService.define(userId,DefineDto);
  }

  //done
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('issue/v2')
  @ApiOperation({description:"Brand Representative can issue Loyalty points",summary:"Issue Loyalty Points"})
  async issueV2(@Req() req,@Body() IssueV2Dto:IssueV2Dto){
    const userId=req.user.userId;
    const email=req.user.email;
    return await this.loyaltyService.issueV2(userId,email,IssueV2Dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('distribute')
  @ApiOperation({description:"Brand Representative can send Loyalty points to the recievers paymail",summary:"Distribute Loyalty Points"})
  async distribute(@Req() req,@Body() DistributeDto:DistributeDto){
    const userId=req.user.userId;
    const email=req.user.email;
    return await this.loyaltyService.distribute(userId,email,DistributeDto);
  }
}
