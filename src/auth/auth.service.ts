import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}
    
    async signIn(id:number,pw:string){
        const user = await this.userService.findOneUser(id);
        if(user.password !== pw){
            throw new UnauthorizedException();
        }
        const payload={id:user.id, name:user.name};
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
        
    }
}
