import { Controller, Body, Post, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignInDto } from 'src/dto/auth.signIn.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    private authService:AuthService;
    constructor(authService:AuthService){
        this.authService=authService;
    }

    @Post('login')
    async signIn(@Body() authSignInDto:AuthSignInDto){
        return this.authService.signIn(authSignInDto.id,authSignInDto.password);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
