import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userService:UserService,
        private jwtService:JwtService
    ) {}

    async validateUser(id:number, pw:string){
        const user= await this.userService.findOneUser(id);
        const isValidPw= await bcrypt.compare(pw, user.password);
        if(isValidPw){
            const {password, ...result}= user;
            return result;
        }
        return null;
    }

    async login(user:any){
        const payload={id:user.id, name:user.name};
        const accessToken = this.jwtService.sign(payload, { expiresIn: '300s' });
        const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
        return{
            accessToken,
            refreshToken,
        };
    }

    async refresh(refresh:string){
        const payload=this.jwtService.decode(refresh);
        return {
            newAccessToken: this.jwtService.sign({id:payload.id, name:payload.name},{expiresIn: '300s'})
        };
    }
}
