import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { get } from 'http';
import { UserPostReqDto } from 'src/dto/user.post.req.dto';

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

    @Get(':id')
    findOneUser(@Param('id') id:number){
        return this.userSerivce.findOneUser(id);
    }

    @Delete(':id')
    removeUser(@Param('id') id:number){
        return this.userSerivce.removeUser(id);
    }
}
