import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsInt, IsJSON, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, Length } from "class-validator"

export class BrandDto{
    @ApiProperty({type:Number,description:"Id of the coalition"})
    @IsNumber()
    @IsNotEmpty()
    coalitionId:number

    @ApiProperty({type:String,description:"Name of the brand"})
    @IsString()
    @Length(2,40)
    @IsNotEmpty()
    brandName:string

    @ApiPropertyOptional({type:String,description:"Description of the brand"})
    @IsString()
    @Length(2,120)
    @IsOptional()
    description?:string

    @ApiPropertyOptional({type:String,description:"Other Details of the brand"})
    @IsOptional()
    @IsJSON()
    otherDetails?: any
}