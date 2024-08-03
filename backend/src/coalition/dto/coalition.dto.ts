import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CoalitionDto{
    @IsString()
    @IsNotEmpty()
    coalitionName:string

    @IsString()
    @IsOptional()
    description?:string
}