import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { UserPostReqDto } from 'src/dto/user.post.req.dto';
import { ErrorType } from 'src/auth/constants';
import * as bcrypt from 'bcrypt';
import { bcryptConstant } from 'src/auth/constants';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository:Repository<User>
    ){}
    
    async createUser(userPostReqDto:UserPostReqDto){
        userPostReqDto.password= await bcrypt.hash(userPostReqDto.password, bcryptConstant.saltOrRounds);
        const {password, ...result} = await this.userRepository.save(userPostReqDto);
        return {
            message:"user 생성 성공",
            user: result,
        }
    }

    async findOneUser(id:number):Promise<User>{
        const user=this.userRepository.findOneBy({id});
        if(!user){
            throw new NotFoundException(ErrorType.USER_NOT_FOUND);
        }
        return user;
    }

    // async findAllUser(){
    //     const user=this.userRepository.find();
    //     if(!user){
    //         throw new NotFoundException(ErrorType.USER_NOT_FOUND);
    //     }
    //     return user;
    // }
    
    // async removeUser(id:number){
    //     const user=this.userRepository.findOneBy({id});
    //     if(!user){
    //         throw new NotFoundException(ErrorType.USER_NOT_FOUND);
    //     }
    //     return await this.userRepository.delete({id});
    // }
}
