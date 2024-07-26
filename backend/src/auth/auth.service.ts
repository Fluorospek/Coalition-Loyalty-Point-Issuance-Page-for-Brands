import { ConflictException, ForbiddenException, Injectable,NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { RegisterBrandRepDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { RelysiaLoginDto } from './dto/relysia-login.dto';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import { map,catchError } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';
const RelysiaSDK=require('../../node_modules/@relysia/sdk/src/relysia-sdk');

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

    async relysiaLogin(RelysiaLoginDto:RelysiaLoginDto){
        // const {email,password}=RelysiaLoginDto;
        // const res=this.http.post('https://api.relysia.com/v1/auth',{email,password})
        // .pipe(map((res)=>res.data?.data))
        // .pipe(catchError((err)=>{throw new ForbiddenException('Invalid credentials')}))

        // const access_token=await lastValueFrom(res);
        // console.log(access_token);

        // return {access_token, statusCode:200};
        const relysia=new RelysiaSDK();
        const res=await relysia.authentication.v1.auth({email:RelysiaLoginDto.email,password:RelysiaLoginDto.password});
        return {res,statusCode:200};
    }
}
