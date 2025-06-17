import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // 경로 수정 필요
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma : PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.prisma.user.create({ data : createUserDto });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  /**
   * 특정 ID의 사용자를 찾습니다.
   * @param id - 찾을 사용자의 ID
   */
  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      // 사용자를 찾지 못한 경우 404 에러를 던지는 것이 좋은 습관입니다.
      throw new NotFoundException(`User with ID #${id} not found`);
    }

    return user;
  }

  /**
   * 특정 ID의 사용자 정보를 업데이트합니다.
   * @param id - 업데이트할 사용자의 ID
   * @param updateUserDto - 업데이트할 정보
   */
  async update(id: number, updateUserDto: UpdateUserDto) {
    // 먼저 해당 유저가 존재하는지 확인하는 로직을 추가하면 더 안전합니다.
    await this.findOne(id); // findOne 메소드가 없으면 404 에러를 던져줍니다.
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  /**
   * 특정 ID의 사용자를 삭제합니다.
   * @param id - 삭제할 사용자의 ID
   */
  async remove(id: number) {
    // 먼저 해당 유저가 존재하는지 확인하는 로직을 추가하면 더 안전합니다.
    await this.findOne(id); // findOne 메소드가 없으면 404 에러를 던져줍니다.
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
