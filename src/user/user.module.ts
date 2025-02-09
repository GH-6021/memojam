import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  exports: [UserService, TypeOrmModule],
  providers: [UserService]
})
export class UserModule {}

/**
 * imports: 다른 module 가져와서 사용
 * providers: 현재 모듈에서 제공하는 Service,Repository,Guard
 * exports: 다른 모듈에서 사용 가능하게 공개
 */