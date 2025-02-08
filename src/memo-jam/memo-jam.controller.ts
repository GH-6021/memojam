import { Controller,Post,Body,Get, Param, Delete, Patch, ParseIntPipe } from '@nestjs/common';
import { MemoJamService } from './memo-jam.service';
import { MemoPostReqDto } from 'src/dto/memo.post.req.dto';
import { MemoUpdateDto } from 'src/dto/memo.update.dto';

@Controller('memo-jam')
export class MemoJamController {
    private memoService:MemoJamService;
    constructor(memoService:MemoJamService){
        this.memoService = memoService;
    }

    @Post()
    createMemo(@Body() memoPostReqDto:MemoPostReqDto){
        return this.memoService.createMemo(memoPostReqDto);
    }

    @Get()
    findAllMemo(){
        return this.memoService.findAllMemo();
    }

    @Get(':id')
    findOneMemo(@Param('id') id:number){
        return this.memoService.findOneMemo(id);
    }

    @Patch()
    updateMemo(@Param('id') id:number, @Body() memoUpdateDto:MemoUpdateDto){
        return this.memoService.updateMemo(id,memoUpdateDto);
    }

    @Delete()
    removeMemo(@Param('id') id:number){
        return this.memoService.removeMemo(id);
    }


}
