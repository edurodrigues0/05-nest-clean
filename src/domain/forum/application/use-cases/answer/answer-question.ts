import { Either, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerAttachmentList } from '@/domain/forum/enterprise/entities/answer-attachement-list'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'

import { Answer } from '../../../enterprise/entities/answer'
import { AnswersRepository } from '../../repositories/answers-repository'

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  attachmentsIds: string[]
  content: string
}

type AnswerQuestionUseCaseResponse = Either<null, { answer: Answer }>

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
    attachmentsIds,
  }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
    })

    const answerAttachments = attachmentsIds.map((id) => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityID(id),
        answerId: answer.id,
      })
    })

    answer.attachments = new AnswerAttachmentList(answerAttachments)

    await this.answersRepository.create(answer)

    return right({
      answer,
    })
  }
}
