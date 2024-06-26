import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
} from '@nestjs/common'
import { z } from 'zod'

import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answer/answer-question'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayLoad } from '@/infra/auth/jwt-strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

const answerQuestionBodySchema = z.object({
  content: z.string(),
  attachmentsIds: z.array(z.string().uuid()),
})

type AnswerQuestionBodySchema = z.infer<typeof answerQuestionBodySchema>

@Controller('/questions/:questionId/answers')
export class AnswerQuestionController {
  constructor(private answerQuestion: AnswerQuestionUseCase) {}

  @Post()
  async handle(
    @Body(new ZodValidationPipe(answerQuestionBodySchema))
    body: AnswerQuestionBodySchema,
    @CurrentUser() user: UserPayLoad,
    @Param('questionId') questionId: string,
  ) {
    const { content, attachmentsIds } = body
    const { sub: userId } = user

    const result = await this.answerQuestion.execute({
      content,
      questionId,
      authorId: userId,
      attachmentsIds,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
