import { Injectable } from '@nestjs/common'

import { Either, right } from '@/core/either'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

import { AnswersCommentsRepository } from '../../repositories/answer-comments-repository'

interface ListAnswerCommentsUseCaseRequest {
  answerId: string
  page: number
}

type ListAnswerCommentsUseCaseResponse = Either<
  null,
  {
    answerComments: AnswerComment[]
  }
>

@Injectable()
export class ListAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: AnswersCommentsRepository) {}

  async execute({
    answerId,
    page,
  }: ListAnswerCommentsUseCaseRequest): Promise<ListAnswerCommentsUseCaseResponse> {
    const answerComments =
      await this.answerCommentsRepository.findManyByAnswerId(answerId, {
        page,
      })

    return right({
      answerComments,
    })
  }
}
