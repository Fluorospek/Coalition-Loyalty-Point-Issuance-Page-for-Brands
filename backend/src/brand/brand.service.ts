import { ConflictException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { BrandDto } from './dto/brand.dto';

@Injectable()
export class BrandService {
    constructor(private readonly dataservice: DatabaseService){}

    async setup(BrandDto:BrandDto){
        const userId=BrandDto.userId;
        const brand=await this.dataservice.brand.findFirst({
            where:{
                userId:userId
            }
        })
        if(brand){
            throw new ConflictException('Brand Already Setup');
        }
        // const res=await this.dataservice.brand.create({data:BrandDto});
    }
}
