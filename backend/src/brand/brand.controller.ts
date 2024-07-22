import { Controller, UseGuards,Post,Body,Req,Get } from '@nestjs/common';
import { BrandService } from './brand.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ApiOperation } from '@nestjs/swagger';
import { BrandDto } from './dto/brand.dto';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @UseGuards(JwtAuthGuard)
  @Get('details')
  @ApiOperation({description:'Get details of brand'})
  async details(@Req() req){
    const userId=req.user.userId;
    return await this.brandService.details(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('setup')
  @ApiOperation({description:'Brand Representative sets up the Brand'})
  async setup(@Req() req, @Body() BrandDto:BrandDto){
    const userId=req.user.userId;
    const email=req.user.email;
    return await this.brandService.setup(userId,email,BrandDto);
  }
}
