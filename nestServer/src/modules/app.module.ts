import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../providers/app.service';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PrismaClient],
})
export class AppModule {}
