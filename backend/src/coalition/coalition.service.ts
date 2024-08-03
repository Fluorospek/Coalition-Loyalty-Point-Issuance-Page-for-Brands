import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { DatabaseService } from 'src/database/database.service';
import { CoalitionDto } from './dto/coalition.dto';
import { ConflictException } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class CoalitionService {
    constructor(
        private readonly databaseService: DatabaseService,
        private http: HttpService
    ){}

    async setup(userId:number, email:string, CoalitionDto:CoalitionDto){
        const coalition=await this.databaseService.coalition.findUnique({
            where:{
                creatorId:userId
            }
        });
        if(coalition){
            throw new ConflictException('Coalition Already Setup');
        }
        const res=await this.databaseService.coalition.create({
            data:{
                name:CoalitionDto.coalitionName,
                description:CoalitionDto.description,
                creator:{
                    connect:{
                        userId:userId,
                        email:email
                    }
                }
            }
        });
        return {coalitionId:res.coalitionId, status: 200}
    }

    async tokens(userId:number){
        const issuedTokens=await this.databaseService.coalition.findUnique({
            where:{
                creatorId:userId
            },
            select:{
                brands:{
                    select:{
                        brandId:true,
                        brandRepId:true,
                        brandName:true,
                        IssuedPoints:true
                    }
                }
            }
        });
        return {data:issuedTokens, statusCode:200};
    }

    async details(userId:number){
        const coalition=await this.databaseService.coalition.findUnique({
            where:{
                creatorId:userId
            }
        });
        if(!coalition){
            throw new NotFoundException('Coalition Not Found');
        }
        return {data:coalition, statusCode:200};
    }

    async tokenDetails(userId:number){
        const brandToken=await this.databaseService.brandTokens.findUnique({
            where:{
                coalitionId:userId
            }
        });
        if(!brandToken){
            throw new NotFoundException('Token Not Found');
        }
        return {data:brandToken, statusCode:200};
    }
}
