import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from './session.serializer';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [UserModule, PassportModule.register({ session: true })],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, LocalStrategy, SessionSerializer],
})
export class AuthenticationModule {}
