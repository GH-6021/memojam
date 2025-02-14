import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserPostReqDto } from 'src/dto/user.post.req.dto';
import { Request } from '@nestjs/common';

@Controller('user')
export class UserController {
    private userSerivce:UserService;
    constructor(userSerivce:UserService){
        this.userSerivce=userSerivce;
    }

    @Post()
    createUser(@Body() userPostReqDto:UserPostReqDto){
        return this.userSerivce.createUser(userPostReqDto);
    }

    findOneUser(@Param('id') id:number){
        return this.userSerivce.findOneUser(id);
    }

    // //관리자 권한 주는법..
    // @Get()
    // findAllUser(){
    //     return this.userSerivce.findAllUser();
    // }


    // @Delete(':id')
    // removeUser(@Param('id')id:number){
    //     return this.userSerivce.removeUser(id);
    // }
}
