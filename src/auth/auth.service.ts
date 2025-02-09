import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { ErrorType } from './constants';

@Injectable()
export class AuthService {
    constructor(
        private userService:UserService,
        private jwtService:JwtService
    ) {}

    async signIn(id:number,pw:string): Promise<{ access_token: string }>{
        const user = await this.userService.findOneUser(id);
        if(user.password !== pw){
            throw new UnauthorizedException(ErrorType.INVALID_PASSWORD);
        }
        const payload={id:user.id, name:user.name};
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
