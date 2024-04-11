import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'
import { QuestionsCommentsRepository } from '../../repositories/question-comments-repository'
import { Either, right } from '@/core/either'

interface ListQuestionCommentsUseCaseRequest {
  questionId: string
  page: number
}

type ListQuestionCommentsUseCaseResponse = Either<
  null,
  { questionComments: QuestionComment[] }
>

export class ListQuestionCommentsUseCase {
  constructor(
    private questionCommentsRepository: QuestionsCommentsRepository,
  ) {}

  async execute({
    questionId,
    page,
  }: ListQuestionCommentsUseCaseRequest): Promise<ListQuestionCommentsUseCaseResponse> {
    const questionComments =
      await this.questionCommentsRepository.findManyByQuestionId(questionId, {
        page,
      })

    return right({
      questionComments,
    })
  }
}
