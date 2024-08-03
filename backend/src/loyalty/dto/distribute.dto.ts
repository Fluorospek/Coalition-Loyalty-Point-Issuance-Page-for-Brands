import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class DistributeDto{
    @ApiProperty({type:String,description:"Access token of neucron wallet"})
    @IsString()
    @IsNotEmpty()
    access_token:string

    @ApiProperty({type:Number,description:"Id of the issued point to be distributed"})
    @IsNumber()
    @IsNotEmpty()
    issuedPointId:number

    @ApiProperty({type:String,description:"Paymail of the recipient"})
    @IsString()
    @IsNotEmpty()
    recipientAddress:string

    @ApiProperty({type:Number,description:"Amount of the issued point to be distributed"})
    @IsNumber()
    @IsNotEmpty()
    amount:number
}