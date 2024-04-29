import { Module } from '@nestjs/common'

import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answer/answer-question'
import { DeleteAnswerUseCase } from '@/domain/forum/application/use-cases/answer/delete-answer'
import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/answer/edit-answer'
import { ListQuestionAnswersUseCase } from '@/domain/forum/application/use-cases/answer/list-questions-answers'
import { ChooseQuestionBestAnswerUseCase } from '@/domain/forum/application/use-cases/choose-question-best-answer'
import { CommentOnAnswerUseCase } from '@/domain/forum/application/use-cases/comment/comment-on-answer'
import { CommentOnQuestionUseCase } from '@/domain/forum/application/use-cases/comment/comment-on-question'
import { DeleteAnswerCommentUseCase } from '@/domain/forum/application/use-cases/comment/delete-answer-comment'
import { DeleteQuestionCommentUseCase } from '@/domain/forum/application/use-cases/comment/delete-question-comment'
import { ListAnswerCommentsUseCase } from '@/domain/forum/application/use-cases/comment/list-answer-comments'
import { ListQuestionCommentsUseCase } from '@/domain/forum/application/use-cases/comment/list-question-comments'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/question/create-question'
import { DeleteQuestionUseCase } from '@/domain/forum/application/use-cases/question/delete-question'
import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/question/edit-question'
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/question/get-question-by-slug'
import { ListRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/question/list-recent-questions'
import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/student/authenticate-student'
import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/student/register-student'

import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { StorageModule } from '../storage/storage.module'
import { AnswerQuestionController } from './controllers/answer-question.controller'
import { AuthenticateController } from './controllers/authenticate.controller'
import { ChooseQuestionBestAnswerController } from './controllers/choose-question-best-answer.controller'
import { CommentOnAnswerController } from './controllers/comment-on-answer.controller'
import { CommentOnQuestionController } from './controllers/comment-on-question.controller'
import { CreatedAccountController } from './controllers/create-account.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { DeleteAnswerController } from './controllers/delete-answer.controller'
import { DeleteAnswerCommentController } from './controllers/delete-answer-comment.controller'
import { DeleteQuestionController } from './controllers/delete-question.controller'
import { DeleteQuestionCommentController } from './controllers/delete-question-comment.controller'
import { EditAnswerController } from './controllers/edit-answer.controller'
import { EditQuestionController } from './controllers/edit-question.controller'
import { FetchAnswerCommentsController } from './controllers/fetch-answer-comments.controller'
import { FetchQuestionCommentsController } from './controllers/fetch-question-comments.controller'
import { FetchQuestionAnswersController } from './controllers/fetch-questions-answers.controller'
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions.controller'
import { GetQuestionBySlugController } from './controllers/get-question-by-slug.controller'
import { UploadAttachmentController } from './controllers/upload-attachment.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule, StorageModule],
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
    CommentOnQuestionController,
    DeleteQuestionCommentController,
    CommentOnAnswerController,
    DeleteAnswerCommentController,
    FetchQuestionCommentsController,
    FetchAnswerCommentsController,
    UploadAttachmentController,
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
    CommentOnQuestionUseCase,
    DeleteQuestionCommentUseCase,
    CommentOnAnswerUseCase,
    DeleteAnswerCommentUseCase,
    ListQuestionCommentsUseCase,
    ListAnswerCommentsUseCase,
  ],
})
export class HttpModule {}
