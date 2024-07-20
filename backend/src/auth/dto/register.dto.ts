import { ApiProperty } from "@nestjs/swagger"
import { IsString,Length,IsEmail,IsNotEmpty } from "class-validator"

export class RegisterBrandRepDto{
    @ApiProperty()
    @IsString()
    @Length(2,40)
    @IsNotEmpty()
    name:string

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email:string

    @ApiProperty()
    @IsString()
    @Length(8,20)
    @IsNotEmpty()
    password:string
}