import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserService {
    constructor(private readonly dataservices:DatabaseService){}

    async profile(userId:number,email:string){
        const user=await this.dataservices.user.findUnique({
            where:{
                userId:userId
            }
        });
        return {
            brandRepId:user.userId,
            email:user.email,
            name:user.name,
            statusCode:200
        };
    }
}

//testing github actions
