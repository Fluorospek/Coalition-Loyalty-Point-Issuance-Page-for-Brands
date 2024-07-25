import { IsNotEmpty, IsString } from "class-validator";

export class IssueDto{
    @IsString()
    @IsNotEmpty()
    neucron_token:string

    @IsString()
    @IsNotEmpty()
    pointName:string

    @IsString()
    @IsNotEmpty()
    symbol:string

    @IsString()
    @IsNotEmpty()
    totalSupply:number
}