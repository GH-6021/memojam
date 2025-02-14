import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { RefreshStrategy } from './refresh.strategy';

@Module({
  imports: [
    JwtModule.register({
      global:true,
      secret:jwtConstants.secret,
      signOptions:{expiresIn:'30s'},
    }),
    UserModule,PassportModule],
  providers: [AuthService,LocalStrategy,JwtStrategy,RefreshStrategy],
  exports:[AuthService],
  controllers: [AuthController],
})
export class AuthModule {}