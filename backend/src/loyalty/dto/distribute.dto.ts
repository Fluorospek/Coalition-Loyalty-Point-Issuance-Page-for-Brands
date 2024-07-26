import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class DistributeDto{
    @IsString()
    @IsNotEmpty()
    access_token:string

    @IsString()
    @IsNotEmpty()
    recipientAddress:string

    @IsNumber()
    @IsNotEmpty()
    amount:number
}