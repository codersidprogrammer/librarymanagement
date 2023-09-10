import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dto/create-user.dto';

@Controller({
  path: 'api',
  version: '1',
})
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/create')
  createHello(): string {
    return 'User was created';
  }

  @Get('/user/:name')
  findUser(@Param('name') personName: string): string {
    return `User name was: ${personName}`;
  }

  @Delete('/user/:name')
  deleteUser(@Param('name') personName: string): string {
    return `User name ${personName} was deleted`;
  }

  @Put('/user/:name')
  updateUser(@Param('name') personName: string): string {
    return `User name ${personName} was updated`;
  }

  @Get('/users/status')
  getUserByStatus(@Res() res: Response): Response<any> {
    const users = this.appService.findUserByStatus(true);
    return res.status(HttpStatus.OK).send({
      data: users,
    });
  }

  @Get('/users')
  getUsers(
    @Req() req: Request,
    @Res() res: Response,
    @Body() data: object,
  ): Response<any> {
    return res.status(HttpStatus.OK).send({
      users: ['dimaseditiya', 'antonio'],
      request: req.url,
    });
  }

  @Get('/config')
  getConfig(@Req() req: Request, @Res() res: Response): Response<any> {
    return res.status(HttpStatus.OK).send({
      data: {
        appName: this.configService.get<string>('APPLICATION_NAME'),
        port: Number(this.configService.get<number>('APPLICATION_PORT')),
      },
    });
  }

  @Post('/create/user')
  registerUser(
    @Req() req: Request,
    @Res() res: Response,
    @Body() userData: CreateUserDto,
  ): Response<any> {
    const result = this.appService.saveNewUser(userData);
    return res.status(HttpStatus.CREATED).send({
      message: 'User created',
      data: result,
    });
  }
}
