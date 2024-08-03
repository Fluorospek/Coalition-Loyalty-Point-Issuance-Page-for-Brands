import { ConflictException, ForbiddenException, Injectable,NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { NeucronLoginDto } from './dto/neucron-login.dto';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import { map,catchError } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';
import { UserRole } from 'src/user-role.enum';

@Injectable()
export class AuthService {
    constructor(
        private readonly dataservice: DatabaseService,
        private readonly jwtservice:JwtService,
        private http:HttpService
    ){}

    async coalitionRegister(RegisterDto:RegisterDto){
        const user= await this.dataservice.user.findUnique({
            where:{
                email:RegisterDto.email
            }
        })
        if(user){
            throw new ConflictException('User already exists');
        }
        const {email,password}=RegisterDto;
        RegisterDto.password=await bcrypt.hash(RegisterDto.password,10);
        RegisterDto.role=UserRole.ADMIN;
        const res=await this.dataservice.user.create({data:RegisterDto});
        const {userId, token}=await this.coalitionLogin({email,password});
        return {userId,token, statusCode:200};
    }

    async coalitionLogin(LoginDto:LoginDto){
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

        if(user.role!==UserRole.ADMIN){
            throw new ForbiddenException('User is not an admin');
        }
        const payload={sub:user.userId,email:user.email,role:user.role}
        return {userId:user.userId,token: this.jwtservice.sign(payload),statusCode: 200}
    }

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

    async register(RegisterDto:RegisterDto){
        const user= await this.dataservice.user.findUnique({
            where:{
                email:RegisterDto.email
            }
        })
        if(user){
            throw new ConflictException('User already exists');
        }
        const {email,password}=RegisterDto;
        RegisterDto.password=await bcrypt.hash(RegisterDto.password,10);
        const res=await this.dataservice.user.create({data:RegisterDto});
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
