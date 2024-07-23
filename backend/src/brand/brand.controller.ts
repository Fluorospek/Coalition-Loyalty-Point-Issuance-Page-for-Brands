import { Controller, UseGuards,Post,Body,Req } from '@nestjs/common';
import { BrandService } from './brand.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ApiOperation } from '@nestjs/swagger';
import { BrandDto } from './dto/brand.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @UseGuards(AuthGuard())
  @Post('setup')
  @ApiOperation({description:'Brand Representative sets up the Brand'})
  async setup(@Req() req, @Body() BrandDto:BrandDto){
    const userId=req.user.userId;
    const email=req.user.email;
    return await this.brandService.setup(userId,email,BrandDto);
  }
}
