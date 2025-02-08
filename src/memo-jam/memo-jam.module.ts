import { Module } from '@nestjs/common';
import { MemoJamController } from './memo-jam.controller';
import { MemoJamService } from './memo-jam.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Memo } from 'src/entity/memo.entity';
import { User } from 'src/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Memo,User])],
  controllers: [MemoJamController],
  providers: [MemoJamService]
})
export class MemoJamModule {}
