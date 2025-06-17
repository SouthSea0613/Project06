import { ApiProperty } from '@nestjs/swagger'; // Swagger 문서화를 위해 추가
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'test@example.com',
    description: '사용자 이메일',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '홍길동',
    description: '사용자 이름',
    required: false, // 선택 사항
  })
  @IsString()
  @IsOptional() // 이 프로퍼티는 선택 사항임을 명시
  name?: string; // '?'를 붙여 TypeScript에서도 선택 사항으로 처리
}
