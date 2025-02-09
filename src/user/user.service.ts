import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { UserPostReqDto } from 'src/dto/user.post.req.dto';
import { ErrorType } from 'src/auth/constants';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository:Repository<User>
    ){}
    
    async createUser(userPostReqDto:UserPostReqDto){
        return await this.userRepository.save(userPostReqDto);
    }

    async findOneUser(id:number):Promise<User>{
        const user=this.userRepository.findOneBy({id});
        if(!user){
            throw new NotFoundException(ErrorType.USER_NOT_FOUND);
        }
        return user;
    }
    
    async removeUser(id:number){
        const user=this.userRepository.findOneBy({id});
        if(!user){
            throw new NotFoundException(ErrorType.USER_NOT_FOUND);
        }
        return await this.userRepository.delete({id});
    }
}
