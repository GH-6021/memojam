import { Controller, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UseGuards, Get, Post } from '@nestjs/common';
import { LocalAuthGuard } from './local.auth.guard';
import { JwtAuthGuard } from './jwt.auth.guard';
import { Request } from '@nestjs/common';
import { RefreshAuthGuard } from './refresh.auth.guard';
import { UnauthorizedException } from '@nestjs/common';


@Controller('auth')
export class AuthController {
    constructor(private authSerivce:AuthService){}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req){
        return this.authSerivce.login(req.user);
    }

    @UseGuards(RefreshAuthGuard)
    @Post('refresh')
    async refresh(@Body('refreshToken') refreshToken: string){
        if (!refreshToken) {
            throw new UnauthorizedException('Refresh token is required');
        }
        return this.authSerivce.refresh(refreshToken);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request()req){
        return req.user;
    }

    //logout은 어떻게..? refresh token삭제
}
