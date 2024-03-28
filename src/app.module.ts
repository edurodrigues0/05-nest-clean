import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { CreatedAccountController } from './controllers/create-account.controller'

@Module({
  controllers: [CreatedAccountController],
  providers: [PrismaService],
})
export class AppModule {}
