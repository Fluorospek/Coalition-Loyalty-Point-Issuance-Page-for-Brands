import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CoalitionDto{
    @ApiProperty({type:String,description:"Name of the coalition"})
    @IsString()
    @IsNotEmpty()
    coalitionName:string

    @ApiProperty({type:String,description:"Description of the coalition"})
    @IsString()
    @IsOptional()
    description?:string
}