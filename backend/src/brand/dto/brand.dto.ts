import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from "class-validator"

export class BrandDto{
    @ApiProperty()
    @IsInt()
    userId:number

    @ApiProperty()
    @IsString()
    @Length(2,20)
    @IsNotEmpty()
    brandName:string

    @ApiProperty()
    @IsString()
    @Length(2,20)
    @IsOptional()
    description:string

    @ApiProperty()
    @IsOptional()
    otherDetails:JSON
}