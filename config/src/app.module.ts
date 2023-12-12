import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from './api/api.module';
import config from './ts/config';

console.log('env: ' + process.env.NODE_ENV);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/src/env/${process.env.NODE_ENV}.env`,
      load: [config],
      cache: true,
      expandVariables: true,
    }),
    ApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
