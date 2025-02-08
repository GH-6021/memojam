import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignInDto } from 'src/dto/auth.signIn.dto';

@Controller('auth')
export class AuthController {
    private authSerive:AuthService;
    constructor(authService:AuthService){
        this.authSerive=authService;
    }

    @Post('login')
    async signIn(@Body() authSignInDto:AuthSignInDto){
        return this.authSerive.signIn(authSignInDto.id,authSignInDto.password);
    }

    
}
