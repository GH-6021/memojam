import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { UserPostResDto } from 'src/dto/user.post.res.dto';
import { UserPostReqDto } from 'src/dto/user.post.req.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('user')
@ApiTags('User API')
export class UserController {
    private userService:UserService;
    constructor(userService:UserService){
        this.userService=userService;
    }

    @Post()
    @ApiOperation({summary:'사용자 생성 API',description:'사용자를 생성한다.'})
    @ApiCreatedResponse({description:'사용자 생성 성공',type: UserPostResDto})
    async createUser(@Body() userPostReqDto:UserPostReqDto, @Res() res:Response){
        const user = await this.userService.createUser(userPostReqDto);
        return res.status(HttpStatus.CREATED).json(user);
    }

    findOneUser(@Param('id') id:number){
        return this.userService.findOneUser(id);
    }

    // //관리자 권한 주는법..
    // @Get()
    // findAllUser(){
    //     return this.userService.findAllUser();
    // }


    // @Delete(':id')
    // removeUser(@Param('id')id:number){
    //     return this.userService.removeUser(id);
    // }
}
