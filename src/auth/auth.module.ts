import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    JwtModule.register({
      global:true,
      secret:jwtConstants.secret,
      signOptions:{expiresIn:'1h'},
    }),
    UserModule],
  controllers: [AuthController],
  providers: [AuthService, UserService],
  exports:[AuthService, UserService],
})
export class AuthModule {}
