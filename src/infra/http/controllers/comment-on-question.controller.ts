import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
} from '@nestjs/common'
import { z } from 'zod'

import { CommentOnQuestionUseCase } from '@/domain/forum/application/use-cases/comment/comment-on-question'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayLoad } from '@/infra/auth/jwt-strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

const commentOnQuestionBodySchema = z.object({
  content: z.string(),
})

type CommentOnQuestionBodySchema = z.infer<typeof commentOnQuestionBodySchema>

@Controller('/questions/:questionId/comments')
export class CommentOnQuestionController {
  constructor(private commentOnQuestion: CommentOnQuestionUseCase) {}

  @Post()
  async handle(
    @Body(new ZodValidationPipe(commentOnQuestionBodySchema))
    body: CommentOnQuestionBodySchema,
    @CurrentUser() user: UserPayLoad,
    @Param('questionId') questionId: string,
  ) {
    const { content } = body
    const { sub: userId } = user

    const result = await this.commentOnQuestion.execute({
      content,
      questionId,
      authorId: userId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
