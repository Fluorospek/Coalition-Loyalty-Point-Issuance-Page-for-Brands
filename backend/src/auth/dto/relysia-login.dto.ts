import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator"

export class RelysiaLoginDto{
    @ApiProperty({type:String,description:"Relysia registered email of the user"})
    @IsEmail()
    @IsNotEmpty()
    email:string

    @ApiProperty({type:String,description:"Password of the Relysia wallet user"})
    @IsString()
    @Length(8,20)
    @IsNotEmpty()
    password:string
}