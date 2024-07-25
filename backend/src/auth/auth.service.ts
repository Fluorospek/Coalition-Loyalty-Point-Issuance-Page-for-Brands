import { ConflictException, Injectable,NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { RegisterBrandRepDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import { map,catchError } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
    constructor(
        private readonly dataservice: DatabaseService,
        private readonly jwtservice:JwtService,
        private http:HttpService
    ){}


    async login(LoginDto:LoginDto){
        const {email,password}=LoginDto;
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
        const payload={sub:user.userId,email:user.email}
        return {brandRepId:user.userId,token: this.jwtservice.sign(payload)}
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

    async neucronLogin(LoginDto:LoginDto){
        const {email,password}=LoginDto;
        const res=this.http.post('https://dev.neucron.io/v1/auth/login',{email,password})
        .pipe(map((res)=>res.data?.data),map((data)=>data.access_token))
        .pipe(catchError((err)=>{throw new NotFoundException('Invalid credentials')}))

        const access_token=await lastValueFrom(res);
        console.log(access_token);

        return {access_token};
    }
}
