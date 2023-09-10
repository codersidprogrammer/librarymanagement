import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AppService {
  // Dimisalkan data data dari database
  private users: CreateUserDto[] = [
    {
      email: 'admin@coders.id',
      userName: 'dimaseditiya',
      isActive: true,
    },
    {
      email: 'admin@coders.id',
      userName: 'antonio',
      isActive: true,
    },
    {
      email: 'admin@coders.id',
      userName: 'rizky',
      isActive: false,
    },
  ];

  getHello(): string {
    return 'Hello Coders Id!';
  }

  findUserByStatus(userStatus: boolean): CreateUserDto[] {
    return this.users.filter((user) => user.isActive === userStatus);
  }

  saveNewUser(entity: CreateUserDto): CreateUserDto {
    this.users.push(entity);
    return entity;
  }
}
