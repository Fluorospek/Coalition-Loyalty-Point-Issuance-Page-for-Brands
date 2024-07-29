import { ConflictException, ForbiddenException, Injectable,NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { RegisterBrandRepDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { NeucronLoginDto } from './dto/neucron-login.dto';
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
        const user=await this.dataservice.user.findUnique({
            where:{
                email:email
            }
        })
        if(!user){
            throw new NotFoundException('User is not registered');
        }

        const validatePass=await bcrypt.compare(password,user.password);
        if(!validatePass){
            throw new ForbiddenException('Password is incorrect');
        }
        const payload={sub:user.userId,email:user.email}
        return {brandRepId:user.userId,token: this.jwtservice.sign(payload),statusCode: 200}
    }

    async register(RegisterBrandRepDto:RegisterBrandRepDto){
        const user= await this.dataservice.user.findUnique({
            where:{
                email:RegisterBrandRepDto.email
            }
        })
        if(user){
            throw new ConflictException('User already exists');
        }
        const {email,password}=RegisterBrandRepDto;
        RegisterBrandRepDto.password=await bcrypt.hash(RegisterBrandRepDto.password,10);
        const res=await this.dataservice.user.create({data:RegisterBrandRepDto});
        const {brandRepId, token}=await this.login({email,password});
        return {brandRepId,token, statusCode:200};
    }

    async neucronLogin(NeucronLoginDto:NeucronLoginDto){
        const {email,password}=NeucronLoginDto;
        const res=this.http.post('https://dev.neucron.io/v1/auth/login',{email,password})
        .pipe(map((res)=>res.data?.data),map((data)=>data.access_token))
        .pipe(catchError((err)=>{throw new ForbiddenException('Invalid credentials')}))

        const neucron_token=await lastValueFrom(res);
        console.log(neucron_token);

        return {neucron_token, statusCode:200};
    }
}
