import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class IssueV2Dto{
    @IsString()
    @IsNotEmpty()
    neucron_token:string

    @IsNumber()
    @IsNotEmpty()
    totalSupply:number
}