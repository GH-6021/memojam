import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserPostReqDto } from 'src/dto/user.post.req.dto';
import { AuthGuard } from 'src/auth/auth.guard';
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

    @Get(':id')
    findOneUser(@Param('id') id:number){
        return this.userSerivce.findOneUser(id);
    }

    @UseGuards(AuthGuard)
    removeUser(@Request() req){
        return this.userSerivce.removeUser(req);
    }
}
