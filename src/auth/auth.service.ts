import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { TokenPayloadDto } from 'src/dto/token.payload.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private userService:UserService,
        private jwtService:JwtService,
        private configService:ConfigService,
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
            refreshToken
        };
    }

    async createAccessToken(payload:TokenPayloadDto){
        if(!payload){
            throw new UnauthorizedException('유효하지 않은 payload입니다.')
        }
        return await this.jwtService.sign(payload, {expiresIn: '300s', secret: this.configService.get<string>('ACCESS_SECRET')});
    }
    async createRefreshToken(payload:TokenPayloadDto){
        if(!payload){
            throw new UnauthorizedException('유효하지 않은 payload입니다.')
        }
        return await this.jwtService.sign(payload, {expiresIn: '7d', secret: this.configService.get<string>('REFRESH_SECRET')});
    }

    async refresh(refreshToken:string){
        const payload= await this.jwtService.decode(refreshToken);
        return {
            newAccessToken: await this.createRefreshToken(payload)
        };
    }
}

// 중복되는 부분 object로 처리하기..., payload는 dto로 처리..?
// export class createToken{
//     constructor(private payload:){}

// }