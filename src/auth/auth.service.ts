import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { accessConstants, RefreshConstants } from './constants';
import { TokenPayloadDto } from 'src/dto/token.payload.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService:UserService,
        private jwtService:JwtService
    ) {}

    async validatePw(id:number, pw:string){
        const user= await this.userService.findOneUser(id);

        const isValidPw= await bcrypt.compare(pw, user.password);
        if(isValidPw == false){
            throw new UnauthorizedException('');
        }

        const {password, ...result}= user;
        return result;
    }

    async login(user:any){
        const payload={id:user.id, name:user.name};
        const accessToken = await this.createAccessToken(payload);
        const refreshToken = await this.createRefreshToken(payload);
        return{
            accessToken,
            refreshToken,
        };
    }

    async createAccessToken(payload:TokenPayloadDto){
        if(!payload){
            throw new UnauthorizedException('유효하지 않은 payload입니다.')
        }
        return await this.jwtService.sign(payload, {expiresIn: '300s', secret: accessConstants.secret});
    }
    async createRefreshToken(payload:TokenPayloadDto){
        if(!payload){
            throw new UnauthorizedException('유효하지 않은 payload입니다.')
        }
        return await this.jwtService.sign(payload, {expiresIn: '7d', secret: RefreshConstants.secret});
    }

    async refresh(refresh:string){
        const payload=this.jwtService.decode(refresh);
        return {
            newAccessToken: await this.createRefreshToken(payload)
        };
    }
}

// 중복되는 부분 object로 처리하기..., payload는 dto로 처리..?
// export class createToken{
//     constructor(private payload:){}

// }