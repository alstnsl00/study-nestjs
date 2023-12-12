import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigModule } from '@nestjs/config';
import { AuthorizationModule } from './authorization/authorization.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'auth.sqlite',
      entities: [User],
      synchronize: true, // 꼭 개발할 떄만 사용!!!
      logging: true,
    }),
    UserModule,
    AuthenticationModule,
    ConfigModule.forRoot(),
    AuthorizationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
