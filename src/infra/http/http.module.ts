import { Module } from '@nestjs/common'

import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/question/create-question'
import { ListRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/question/list-recent-questions'
import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/student/authenticate-student'
import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/student/register-student'

import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreatedAccountController } from './controllers/create-account.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreatedAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
  ],
  providers: [
    CreateQuestionUseCase,
    ListRecentQuestionsUseCase,
    RegisterStudentUseCase,
    AuthenticateStudentUseCase,
  ],
})
export class HttpModule {}
