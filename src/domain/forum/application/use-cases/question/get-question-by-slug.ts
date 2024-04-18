import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { QuestionNotFoundError } from '@/core/errors/errors/question-not-found-error'

import { Question } from '../../../enterprise/entities/question'
import { QuestionsRepository } from '../../repositories/questions-repository'

interface GetQuestionBySlugUseCaseRequest {
  slug: string
}

type GetQuestionBySlugUseCaseResponse = Either<
  QuestionNotFoundError,
  {
    question: Question
  }
>

@Injectable()
export class GetQuestionBySlugUseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
    slug,
  }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.questionRepository.findBySlug(slug)

    if (!question) {
      return left(new QuestionNotFoundError())
    }

    return right({
      question,
    })
  }
}
