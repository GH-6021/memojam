import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AccessGuard implements CanActivate{
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService) {}

    async canActivate(context: ExecutionContext): Promise<boolean>{
        const request = context.switchToHttp().getRequest();

        //토큰존재 확인
        const {authorization} = request.headers;
        if(!authorization){
            throw new UnauthorizedException('액세스토큰이 필요합니다.');
        }
        const token = authorization.split(' ')[1];

        //액세스토큰 검증
        let payload;
        try{
            payload = await this.jwtService.verifyAsync(token,{
                secret: process.env.ACCESS_SECRET,
            });
        }catch(error){
            throw new UnauthorizedException('만료되거나, 잘못된 토큰입니다.');
        }

        //사용자 확인
        const user = await this.userService.findOneUser(payload.id);
        if(!user){
            throw new UnauthorizedException('존재하지 않는 사용자입니다.');
        }
        request.user = user;
        return true;
    }
}