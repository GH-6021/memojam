import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { HttpException } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common";
import { jwtConstants } from "./constants";

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh'){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload:any){
        const {id, name, exp} = payload;
        if(id && name !== null && name !== undefined){
            if(Date.now() < exp*1000){
                return {id,name};
            }
            throw new HttpException('refresh_token 만료',HttpStatus.UNAUTHORIZED);
        }else{
            throw new HttpException('접근 오류',HttpStatus.FORBIDDEN);
        }
    }
}