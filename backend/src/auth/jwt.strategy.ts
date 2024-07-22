import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { DatabaseService } from "src/database/database.service";
import {Strategy, ExtractJwt} from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private readonly databaseService: DatabaseService
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey: process.env.SECRET
        })
    }

    async validate(payload: any ){
        // const user = await this.databaseService.user.findFirst({
        //     where:{
        //         email:payload.email,
        //     },
        // });
        // return user;
        return {userId:payload.sub,email:payload.email};
    }
}