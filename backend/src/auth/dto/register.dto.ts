import { ApiProperty } from "@nestjs/swagger"
import { IsString,Length,IsEmail,IsNotEmpty } from "class-validator"

export class RegisterBrandRepDto{
    @ApiProperty({type:String,description:"Name of the user"})
    @IsString()
    @Length(2,40)
    @IsNotEmpty()
    name:string

    @ApiProperty({type:String,description:"Email of the user"})
    @IsEmail()
    @IsNotEmpty()
    email:string

    @ApiProperty({type:String,description:"Password of the user"})
    @IsString()
    @Length(8,20)
    @IsNotEmpty()
    password:string
}