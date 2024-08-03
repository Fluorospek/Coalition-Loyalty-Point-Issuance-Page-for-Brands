import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class DefineDto{
    @ApiProperty({type:String,description:"Name of the point"})
    @IsString()
    @IsNotEmpty()
    pointName:string

    @ApiProperty({type:String,description:"Symbol of the point"})
    @IsString()
    @IsNotEmpty()
    symbol:string
}