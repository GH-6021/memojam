import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemoJamModule } from './memo-jam/memo-jam.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Memo } from './entity/memo.entity';
import { User } from './entity/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: '127.0.0.1',
      port: 3306,
      username: 'test',
      password: 'test',
      database: 'memojam',
      entities: [Memo,User],
      synchronize: true,
    })
    ,MemoJamModule,UserModule,AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
