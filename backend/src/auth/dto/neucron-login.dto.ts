import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator"

export class NeucronLoginDto{
    @ApiProperty({type:String,description:"Neucron registered email of the user"})
    @IsEmail()
    @IsNotEmpty()
    email:string

    @ApiProperty({type:String,description:"Password of the Neucron wallet user"})
    @IsString()
    @IsNotEmpty()
    password:string
}