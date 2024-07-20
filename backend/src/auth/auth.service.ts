import { ConflictException, Injectable,NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { RegisterBrandRepDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginBrandRepDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly dataservice: DatabaseService,
        private readonly jwtservice:JwtService
    ){}

    async login(LoginBrandRepDto:LoginBrandRepDto){
        const {email,password}=LoginBrandRepDto;
        const user=await this.dataservice.user.findFirst({
            where:{
                email:email
            }
        })
        if(!user){
            throw new NotFoundException('User is not registered');
        }

        const validatePass=await bcrypt.compare(password,user.password);
        if(!validatePass){
            throw new NotFoundException('Password is incorrect');
        }

        return {brandRepId:user.userId,token: this.jwtservice.sign({email})}
    }

    async register(RegisterBrandRepDto:RegisterBrandRepDto){
        const user=this.dataservice.user.findFirst({
            where:{
                email:RegisterBrandRepDto.email
            }
        })
        if(!user){
            throw new ConflictException('User already exists');
        }
        const {email,password}=RegisterBrandRepDto;
        RegisterBrandRepDto.password=await bcrypt.hash(RegisterBrandRepDto.password,10);
        const res=await this.dataservice.user.create({data:RegisterBrandRepDto});
        const {brandRepId, token}=await this.login({email,password});
        return {brandRepId,token};
    }
}
