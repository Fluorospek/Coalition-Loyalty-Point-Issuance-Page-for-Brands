import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class DistributeDto{
    @IsString()
    @IsNotEmpty()
    access_token:string

    @IsNumber()
    @IsNotEmpty()
    issuedPointId:number

    @IsString()
    @IsNotEmpty()
    recipientAddress:string

    @IsNumber()
    @IsNotEmpty()
    amount:number
}