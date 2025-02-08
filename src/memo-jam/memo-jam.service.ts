import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Memo } from 'src/entity/memo.entity';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MemoJamService {
    constructor(
        @InjectRepository(Memo)
        private memoRepository:Repository<Memo>,
        @InjectRepository(User)
        private userRepository:Repository<User>
    ){}

    

}
