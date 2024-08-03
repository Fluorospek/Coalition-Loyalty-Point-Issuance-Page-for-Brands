import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class IssueV2Dto{
    @ApiProperty({type:String,description:"Access token of neucron wallet"})
    @IsString()
    @IsNotEmpty()
    neucron_token:string

    @ApiProperty({type:String,description:"Name of the point"})
    @IsNumber()
    @IsNotEmpty()
    totalSupply:number
}