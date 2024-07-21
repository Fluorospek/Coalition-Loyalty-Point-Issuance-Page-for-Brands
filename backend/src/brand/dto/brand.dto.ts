import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsJSON, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, Length } from "class-validator"

export class BrandDto{
    @ApiProperty()
    @IsString()
    @Length(2,40)
    @IsNotEmpty()
    brandName:string

    @ApiProperty()
    @IsString()
    @Length(2,120)
    @IsOptional()
    description?:string

    @ApiProperty()
    @IsOptional()
    @IsJSON()
    otherDetails?: any
}