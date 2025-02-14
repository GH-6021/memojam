import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";
import { UnauthorizedException } from "@nestjs/common";
import { ErrorType } from "./constants";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local'){
    constructor(private authService:AuthService){
        super({
            usernameField: 'id'
        });
    }

    async validate(id:number,password:string){
        const user= await this.authService.validateUser(id,password);
        if(!user){
            throw new UnauthorizedException(ErrorType.INVALID_PASSWORD);
        }
        return user;
    }
}