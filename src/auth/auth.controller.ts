import { Controller, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Post } from '@nestjs/common';
import { AuthLoginDto } from 'src/dto/auth.login.dto';
import { RefreshGuard } from './refresh.guard';


@Controller('auth')
export class AuthController {
    constructor(private authSerivce:AuthService){}

    @Post('login')
    async login(@Body() authLoginDto:AuthLoginDto){
        let result = await this.authSerivce.validatePw(authLoginDto.id, authLoginDto.password);
        return this.authSerivce.login(result);
    }

    @Post('refresh')
    @UseGuards(RefreshGuard)
    async refresh(@Body('refreshToken') refreshToken: string){
        return this.authSerivce.refresh(refreshToken);
    }

    //logout은 어떻게..? refresh token삭제
}
