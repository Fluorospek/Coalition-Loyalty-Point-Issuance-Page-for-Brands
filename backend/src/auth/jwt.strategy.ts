import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { DatabaseService } from "src/database/database.service";
import {Strategy, ExtractJwt} from "passport-jwt";
import { jwtConstants } from "./constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private readonly databaseService: DatabaseService
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey: jwtConstants.secret
        })
    }

    async validate(payload: {email:string} ){
        const user = await this.databaseService.user.findFirst({
            where:{
                email:payload.email,
            },
        });
        return user;
    }
}