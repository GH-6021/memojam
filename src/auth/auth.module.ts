import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AccessGuard } from './access.guard';

@Module({
  imports: [UserModule, JwtModule],
  providers: [AuthService, AccessGuard],
  exports:[AuthService, JwtModule, AccessGuard],
  controllers: [AuthController],
})
export class AuthModule {}