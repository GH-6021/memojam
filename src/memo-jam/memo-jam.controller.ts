import { Controller,Post,Body,Get, Param, Delete, Patch, Request } from '@nestjs/common';
import { MemoJamService } from './memo-jam.service';
import { MemoPostReqDto } from 'src/dto/memo.post.req.dto';
import { MemoUpdateDto } from 'src/dto/memo.update.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('memo-jam')
export class MemoJamController {
    private memoService:MemoJamService;
    constructor(memoService:MemoJamService){
        this.memoService = memoService;
    }

    @Post()
    createMemo(@Request()req, @Body()memoPostReqDto:MemoPostReqDto){
        const userId=req.user.id;
        return this.memoService.createMemo(userId,memoPostReqDto);
    }

    @Get()
    findUserAllMemo(@Request()req){
        const userId=req.user.id;
        return this.memoService.findUserAllMemo(userId);
    }

    @Get(':id')
    findUserOneMemo(@Request()req, @Param('id') id:number){
        const userId=req.user.id;
        return this.memoService.findUserOneMemo(userId,id);
    }

    @Patch(':id')
    updateMemo(@Request()req, @Param('id') id:number, @Body() memoUpdateDto:MemoUpdateDto){
        const userId=req.user.id;
        return this.memoService.updateMemo(userId,id,memoUpdateDto);
    }

    @Delete(':id')
    removeMemo(@Request()req, @Param('id') id:number){
        const userId=req.user.id;
        return this.memoService.removeMemo(userId,id);
    }


}
