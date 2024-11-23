import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModuleModule } from './user-module/user-module.module';
import { ConfigModule } from '@nestjs/config';
import postgresConfig from './common/postgres.config';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(postgresConfig()),
    UserModuleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
