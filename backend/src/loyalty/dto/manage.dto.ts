import { IsNotEmpty, IsString } from "class-validator";

export class ManageDto{
    @IsString()
    @IsNotEmpty()
    neucron_token:string
}