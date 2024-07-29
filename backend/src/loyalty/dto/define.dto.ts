import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class DefineDto{

    @IsString()
    @IsNotEmpty()
    pointName:string

    @IsString()
    @IsNotEmpty()
    symbol:string

    @IsNumber()
    @IsNotEmpty()
    totalSupply:number
}