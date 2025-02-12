import { Controller,Post,Body,Get, Param, Delete, Patch, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { MemoJamService } from './memo-jam.service';
import { MemoPostReqDto } from 'src/dto/memo.post.req.dto';
import { MemoUpdateDto } from 'src/dto/memo.update.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from '@nestjs/common';

@UseGuards(AuthGuard)
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

    @Patch()
    updateMemo(@Request()req, @Param('id') id:number, @Body() memoUpdateDto:MemoUpdateDto){
        const userId=req.user.id;
        return this.memoService.updateMemo(userId,id,memoUpdateDto);
    }

    @Delete()
    removeMemo(@Request()req, @Param('id') id:number){
        const userId=req.user.id;
        return this.memoService.removeMemo(userId,id);
    }


}
