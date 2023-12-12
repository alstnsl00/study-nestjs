import { Module } from '@nestjs/common';
import { AuthorizationController } from './authorization.controller';
import { GoogleStrategy } from './google.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule, PassportModule.register({ session: true })],
  controllers: [AuthorizationController],
  providers: [GoogleStrategy],
})
export class AuthorizationModule {}
