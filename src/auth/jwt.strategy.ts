import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from "./constants";
import { log } from "console";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt'){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload:any){
        const {id, name, exp} = payload;

        log(payload);
        if(id && name !== null && name !== undefined){
            if(Date.now() < exp*1000){
                return {id,name};
            }
            throw new HttpException('access_token 만료',HttpStatus.UNAUTHORIZED);
        }else{
            throw new HttpException('접근 오류',HttpStatus.FORBIDDEN);
        }
    }
}