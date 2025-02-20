import { Injectable, NotFoundException, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorType } from 'src/auth/constants';
import { MemoPostReqDto } from 'src/dto/memo.post.req.dto';
import { MemoUpdateDto } from 'src/dto/memo.update.res.dto';
import { Memo } from 'src/entity/memo.entity';
import { User } from 'src/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class MemoJamService {
    constructor(
        @InjectRepository(Memo)
        private memoRepository:Repository<Memo>,
        @InjectRepository(User)
        private userRepository:Repository<User>,
        private userService:UserService
    ){}

    /*
        사용자존재여부
        memoDto형식확인
    */
    async createMemo(userId:number, memoPostReqDto:MemoPostReqDto){
        const user = await this.userService.findOneUser(userId);
        const memo= await this.memoRepository.create({...memoPostReqDto,user});
        await this.memoRepository.save(memo);
        return memoPostReqDto;
    }

    //해당 유저가 작성한 모든 메모 열람
    /* 
        사용자존재여부
        메모존재여부
    */
    async findUserAllMemo(userId:number){
        await this.userService.findOneUser(userId);
        const memo= await this.memoRepository.find({where:{user: { id: userId }}});
        if(!memo){
            throw new NotFoundException(ErrorType.MEMO_NOT_FOUND);
        }
        return memo;
    }

    //메모 생성시 생기는 id는 고유.. 메모 생성순서대로 정렬해서 보여줄려면..?
    async findUserOneMemo(userId:number,id:number){
        await this.userService.findOneUser(userId);
        const memo= await this.memoRepository.findOne({where:{id:id}});
        if(!memo){
            throw new NotFoundException(ErrorType.MEMO_NOT_FOUND);
        }
        return memo;
    }

    async updateMemo(userId:number,id:number,memoUpdateDto:MemoUpdateDto){
        await this.userService.findOneUser(userId);
        const memo=await this.memoRepository.findOneBy({id});
        if(!memo){
            throw new NotFoundException(ErrorType.MEMO_NOT_FOUND);
        }
        return this.memoRepository.update(id,memoUpdateDto);
    }

    async removeMemo(userId:number,id:number){
        await this.userService.findOneUser(userId);
        const memo= await this.memoRepository.findOneBy({id});
        if(!memo){
            throw new NotFoundException(ErrorType.MEMO_NOT_FOUND);
        }
        await this.memoRepository.delete(id);
        return {message:"메모 삭제 완료"};
    }
}
