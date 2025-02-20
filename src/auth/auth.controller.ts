import { Controller, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Post } from '@nestjs/common';
import { AuthLoginReqDto } from 'src/dto/auth.login.req.dto';
import { RefreshGuard } from './refresh.guard';
import { ApiCreatedResponse, ApiOperation, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { authLoginResDto } from 'src/dto/auth.login.res.dto';
import { AuthRefreshResDto } from 'src/dto/auth.refresh.res.dto';
import { AuthRefreshReqDto } from 'src/dto/auth.refresh.req.dto';


@Controller('auth')
@ApiTags('auth API')
export class AuthController {
    constructor(private authSerivce:AuthService){}

    @Post('login')
    @ApiOperation({summary:'로그인 API',description:'해당 id의 메모를 수정한다.'})
    @ApiOkResponse({description:'로그인 성공',type:authLoginResDto})
    async login(@Body() authLoginDto:AuthLoginReqDto){
        let result = await this.authSerivce.validatePw(authLoginDto.id, authLoginDto.password);
        return this.authSerivce.login(result);
    }

    @Post('refresh')
    @ApiOperation({summary:'refresh API',description:'액세스 토큰을 갱신한다.'})
    @ApiCreatedResponse({description:'액세스 토큰 갱신 성공', type:AuthRefreshResDto})
    @UseGuards(RefreshGuard)
    async refresh(@Body() refreshToken: AuthRefreshReqDto){
        return await this.authSerivce.refresh(refreshToken.refreshToken);
    }

    //logout은 어떻게..? refresh token삭제
}
