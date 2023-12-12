import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
// import { ConfigModule } from '@nestjs/config';

@Module({
  // imports: [
  //   ConfigModule.forRoot({
  //     envFilePath: `${process.cwd()}/${process.env.NODE_ENV}.env`,
  //   }),
  // ], // isGloabl: true
  controllers: [ApiController],
})
export class ApiModule {}
