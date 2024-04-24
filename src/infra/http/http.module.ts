import { Module } from '@nestjs/common'

import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answer/answer-question'
import { DeleteAnswerUseCase } from '@/domain/forum/application/use-cases/answer/delete-answer'
import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/answer/edit-answer'
import { ListQuestionAnswersUseCase } from '@/domain/forum/application/use-cases/answer/list-questions-answers'
import { ChooseQuestionBestAnswerUseCase } from '@/domain/forum/application/use-cases/choose-question-best-answer'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/question/create-question'
import { DeleteQuestionUseCase } from '@/domain/forum/application/use-cases/question/delete-question'
import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/question/edit-question'
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/question/get-question-by-slug'
import { ListRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/question/list-recent-questions'
import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/student/authenticate-student'
import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/student/register-student'

import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { AnswerQuestionController } from './controllers/answer-question.controller'
import { AuthenticateController } from './controllers/authenticate.controller'
import { ChooseQuestionBestAnswerController } from './controllers/choose-question-best-answer.controller'
import { CreatedAccountController } from './controllers/create-account.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { DeleteAnswerController } from './controllers/delete-answer.controller'
import { DeleteQuestionController } from './controllers/delete-question.controller'
import { EditAnswerController } from './controllers/edit-answer.controller'
import { EditQuestionController } from './controllers/edit-question.controller'
import { FetchQuestionAnswersController } from './controllers/fetch-questions-answers.controller'
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions.controller'
import { GetQuestionBySlugController } from './controllers/get-question-by-slug.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreatedAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
    GetQuestionBySlugController,
    EditQuestionController,
    DeleteQuestionController,
    AnswerQuestionController,
    EditAnswerController,
    DeleteAnswerController,
    FetchQuestionAnswersController,
    ChooseQuestionBestAnswerController,
  ],
  providers: [
    CreateQuestionUseCase,
    ListRecentQuestionsUseCase,
    RegisterStudentUseCase,
    AuthenticateStudentUseCase,
    GetQuestionBySlugUseCase,
    EditQuestionUseCase,
    DeleteQuestionUseCase,
    AnswerQuestionUseCase,
    EditAnswerUseCase,
    DeleteAnswerUseCase,
    ListQuestionAnswersUseCase,
    ChooseQuestionBestAnswerUseCase,
  ],
})
export class HttpModule {}
