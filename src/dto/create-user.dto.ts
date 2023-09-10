import { IsBoolean, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {

  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
