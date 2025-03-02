import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class RefreshGuard implements CanActivate{
    constructor(private readonly jwtService:JwtService){}

    async canActivate(context: ExecutionContext){
        const request = context.switchToHttp().getRequest();
        const {refreshToken} = request.Body;
        if(!refreshToken){
            throw new UnauthorizedException('refresh토큰이 필요합니다.');
        }

        try{
            await this.jwtService.verifyAsync(refreshToken,{
                secret: process.env.REFRESH_SECRET,
            });
        }catch(error){
            throw new UnauthorizedException('만료되거나 잘못된 토큰입니다.');
        }

        return true;
    }
}