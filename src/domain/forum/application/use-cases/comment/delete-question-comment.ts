import { Either, left, right } from '@/core/either'
import { QuestionsCommentsRepository } from '../../repositories/question-comments-repository'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { QuestionCommentNotFoundError } from '@/core/errors/errors/question-comment-not-found-error'

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string
  questionCommentId: string
}

type DeleteQuestionCommentUseCaseResponse = Either<
  NotAllowedError | QuestionCommentNotFoundError,
  null
>

export class DeleteQuestionCommentUseCase {
  constructor(
    private questionCommentsRepository: QuestionsCommentsRepository,
  ) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment =
      await this.questionCommentsRepository.findById(questionCommentId)

    if (!questionComment) {
      return left(new QuestionCommentNotFoundError())
    }

    if (questionComment.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    await this.questionCommentsRepository.delete(questionComment)

    return right(null)
  }
}
