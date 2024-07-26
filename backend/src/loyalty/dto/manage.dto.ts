import { IsNotEmpty, IsString } from "class-validator";

export class ManageDto{
    @IsString()
    @IsNotEmpty()
    access_token:string
}