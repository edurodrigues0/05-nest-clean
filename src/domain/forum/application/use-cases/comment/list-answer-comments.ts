import { Injectable } from '@nestjs/common'

import { Either, right } from '@/core/either'
import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/comment-with-author'

import { AnswersCommentsRepository } from '../../repositories/answer-comments-repository'

interface ListAnswerCommentsUseCaseRequest {
  answerId: string
  page: number
}

type ListAnswerCommentsUseCaseResponse = Either<
  null,
  { comments: CommentWithAuthor[] }
>

@Injectable()
export class ListAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: AnswersCommentsRepository) {}

  async execute({
    answerId,
    page,
  }: ListAnswerCommentsUseCaseRequest): Promise<ListAnswerCommentsUseCaseResponse> {
    const comments =
      await this.answerCommentsRepository.findManyByAnswerIdWithAuthor(
        answerId,
        {
          page,
        },
      )

    return right({
      comments,
    })
  }
}
