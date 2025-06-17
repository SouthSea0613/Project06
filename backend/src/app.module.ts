import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module'; // PrismaModule을 import

@Module({
  imports: [
    PrismaModule, // PrismaModule을 imports 배열에 추가
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
