import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { UserPostReqDto } from 'src/dto/user.post.req.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository:Repository<User>
    ){}
    
    async createUser(userPostReqDto:UserPostReqDto){
        return this.userRepository.save(userPostReqDto);
    }

    async findOneUser(id:number):Promise<User>{
        const user=this.userRepository.findOneBy({id});
        if(!user){

        }
        return user;
    }
    
}
