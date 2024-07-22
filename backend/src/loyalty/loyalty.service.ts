import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
// import NeucronSDK from 'neucron-sdk';

@Injectable()
export class LoyaltyService {
    constructor(private readonly databaseservice:DatabaseService){}

    async login(email:string, password:string){
        // const neucronSDK=new NeucronSDK();
    }
}
