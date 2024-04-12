import { Module } from '@nestjs/common'

import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'

import { PrismaService } from './prisma/prisma.service'
import { PrismAnswerAttachmentsRepository } from './prisma/repositories/prisma-answer-attachments-repository'
import { PrismaAnswersCommentsRepository } from './prisma/repositories/prisma-answer-comments-repository'
import { PrismaAnswersRepository } from './prisma/repositories/prisma-answers-repository'
import { PrismaQuestionAttachmentsRepository } from './prisma/repositories/prisma-question-attachments-repository'
import { PrismaQuestionCommentsRepository } from './prisma/repositories/prisma-question-comments-repository'
import { PrismaQuestionsRepository } from './prisma/repositories/prisma-questions-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: QuestionsRepository,
      useClass: PrismaQuestionsRepository,
    },
    PrismaQuestionCommentsRepository,
    PrismaQuestionAttachmentsRepository,
    PrismaAnswersRepository,
    PrismaAnswersCommentsRepository,
    PrismAnswerAttachmentsRepository,
  ],
  exports: [
    PrismaService,
    QuestionsRepository,
    PrismaQuestionCommentsRepository,
    PrismaQuestionAttachmentsRepository,
    PrismaAnswersRepository,
    PrismaAnswersCommentsRepository,
    PrismAnswerAttachmentsRepository,
  ],
})
export class DatabaseModule {}
