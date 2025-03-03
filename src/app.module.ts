import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemoJamModule } from './memo-jam/memo-jam.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Memo } from './entity/memo.entity';
import { User } from './entity/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [MemoJamModule,UserModule,AuthModule,
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3307,
      username: 'test',
      password: 'test',
      database: 'memojam',
      entities: [Memo,User],
      synchronize: true,
    })
    ,ConfigModule.forRoot({
      isGlobal:true,
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
