import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common'; // ValidationPipe 임포트

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ValidationPipe 전역 적용
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO에 정의되지 않은 속성은 자동으로 제거
      forbidNonWhitelisted: true, // DTO에 정의되지 않은 속성이 들어오면 에러 발생
      transform: true, // 요청 데이터를 DTO 타입으로 변환
    }),
  );

  // Swagger 설정
  const config = new DocumentBuilder()
    .setTitle('My Project API')
    .setDescription('The API description for my full-stack project')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // '/api' 경로에 Swagger UI 생성

  // CORS 활성화
  app.enableCors({
    origin: 'http://localhost:3000', // 프론트엔드 주소
    credentials: true,
  });

  await app.listen(3001); // 백엔드 포트는 3001로 설정
}
bootstrap();
