import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { BrandDto } from './dto/brand.dto';

@Injectable()
export class BrandService {
    constructor(private readonly dataservice: DatabaseService){}

    async findBrand(userId:number){
        const brand=await this.dataservice.brand.findUnique({
            where:{
                brandRepId:userId
            }
        })
        return brand;
    }

    async details(userId:number){
        const brand=await this.findBrand(userId);
        if(!brand){
            throw new NotFoundException('Brand Not Found');
        }
        console.log(brand);
        return {data:brand, statusCode:200};
    }

    async setup(userId:number, email:string, BrandDto:BrandDto){
        const brand=await this.findBrand(userId);
        if(brand){
            throw new ConflictException('Brand Already Setup');
        }
        const res=await this.dataservice.brand.create({
            data:{
                brandName:BrandDto.brandName,
                description:BrandDto.description,
                otherDetails:BrandDto.otherDetails,
                user:{
                    connect:{
                        userId:userId,
                        email:email
                    }
                }
            }
        })
        return {brandId:res.brandId, status: 200}
    }
}