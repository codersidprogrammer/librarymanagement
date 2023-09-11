import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/core/service/prisma.service';
import { $Enums, User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto): Promise<User> {
    try {
      return await this.prisma.user.create({
        data: {
          username: dto.userName,
          email: dto.email,
          isUserActive: dto.isActive || $Enums.ActiveStatus.NOTACTIVE,
        },
      });
    } catch (error) {
      throw new HttpException('Error occured', 500);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.prisma.user.findMany();
    } catch (error) {
      throw new HttpException('Error ocured', 500);
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      return await this.prisma.user.findFirst({
        where: {
          id: id,
          isUserActive: $Enums.ActiveStatus.ACTIVE,
        },
      });
    } catch (error) {
      throw new HttpException('Not found', 404);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      return await this.prisma.user.update({
        data: {
          username: updateUserDto.userName,
          email: updateUserDto.email,
          isUserActive: updateUserDto.isActive,
        },
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new HttpException('Not found', 404);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.user.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new HttpException('Not found', 404);
    }
  }
}
