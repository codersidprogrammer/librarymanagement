import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private logger: Logger;

  constructor() {
    super({
      log: ['info', 'query'],
    });

    this.logger = new Logger(PrismaService.name);
  }

  async onModuleInit(): Promise<void> {
    this.logger.log('Database connection occured');
    await this.$connect();
  }
}
