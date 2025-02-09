import { Module } from '@nestjs/common';
import { MemoJamController } from './memo-jam.controller';
import { MemoJamService } from './memo-jam.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Memo } from 'src/entity/memo.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Memo]),UserModule],
  controllers: [MemoJamController],
  providers: [MemoJamService]
})
export class MemoJamModule {}
