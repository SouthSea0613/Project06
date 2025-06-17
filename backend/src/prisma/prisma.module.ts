import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // 이 줄을 추가하면 다른 모듈에서 PrismaModule을 imports 하지 않아도 됩니다.
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // PrismaService를 다른 모듈에서 사용할 수 있도록 export 합니다.
})
export class PrismaModule {}