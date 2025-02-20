import { Controller,Post,Body,Get, Param, Delete, Patch, Request, HttpStatus, HttpException } from '@nestjs/common';
import { MemoJamService } from './memo-jam.service';
import { MemoPostReqDto } from 'src/dto/memo.post.req.dto';
import { MemoUpdateDto } from 'src/dto/memo.update.res.dto';
import { UseGuards } from '@nestjs/common';
import { AccessGuard } from 'src/auth/access.guard';
import { ApiContinueResponse, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@UseGuards(AccessGuard)
@Controller('memo-jam')
@ApiTags('memo API')
export class MemoJamController {
    private memoService:MemoJamService;
    constructor(memoService:MemoJamService){
        this.memoService = memoService;
    }

    @Post()
    @ApiOperation({summary:'메모 생성 API',description:'메모를 생성한다.'})
    @ApiCreatedResponse({description:'메모 생성 성공',type:MemoPostReqDto})
    async createMemo(@Request()req, @Body()memoPostReqDto:MemoPostReqDto){
        try{
            const userId=req.user.id;
            const memo = await this.memoService.createMemo(userId,memoPostReqDto);
            return{
                statusCode: HttpStatus.CREATED,
                message: '메모 생성 성공',
                data:memo,
            };
        }catch(error){
            throw new HttpException('메모 생성 실패',500);
        }
    }

    @Get()
    @ApiOperation({summary:'모든 메모 열람 API',description:'모든 메모를 가져온다.'})
    @ApiCreatedResponse({description:'모든 메모 열람 성공',type:MemoPostReqDto})
    async findUserAllMemo(@Request()req){
        try{
            const userId=req.user.id;
            const memo = await this.memoService.findUserAllMemo(userId);
            return{
                statusCode: HttpStatus.OK,
                message: '모든 메모 열람 성공',
                data: memo,
            }
        }catch(error){
            throw new HttpException('메모 열람 실패',500);
        }
    }

    @Get(':id')
    @ApiOperation({summary:'메모 열람 API;',description:'해당 id의 메모를 가져온다.'})
    @ApiCreatedResponse({description:'메모 열람 성공',type:MemoPostReqDto})
    async findUserOneMemo(@Request()req, @Param('id') id:number){
        try{
            const userId=req.user.id;
            const memo = await this.memoService.findUserOneMemo(userId,id);
            return{
                statusCode: 200,
                message: {id}+' 메모 열람 성공',
                data: memo,
            }
        }catch(error){
            throw new HttpException('메모 열람 실패',500);
        }
    }

    @Patch(':id')
    @ApiOperation({summary:'메모 업데이트 API',description:'해당 id의 메모를 수정한다.'})
    @ApiCreatedResponse({description:'메모 수정 성공',type:MemoPostReqDto})
    async updateMemo(@Request()req, @Param('id') id:number, @Body() memoUpdateDto:MemoUpdateDto){
        try{
            const userId=req.user.id;
            const memo = await this.memoService.updateMemo(userId,id,memoUpdateDto);
            return{
                statusCode: 200,
                message: {id}+' 메모 수정 성공',
                data: memo,
            }
        }catch(error){
            throw new HttpException('메모 수정 실패',500);
        }
    }

    @Delete(':id')
    @ApiOperation({summary:'메모 삭제 API',description:'해당 id의 메모를 삭제한다.'})
    @ApiCreatedResponse({description:'메모 삭제 성공'})
    async removeMemo(@Request()req, @Param('id') id:number){
        try{
            const userId=req.user.id;
            const result = await this.memoService.removeMemo(userId,id);
            return{
                statusCode: 200,
                message: {id}+' 메모 삭제 성공',
            }
        }catch(error){
            throw new HttpException('메모 삭제 실패',500);
        }
    }


}
