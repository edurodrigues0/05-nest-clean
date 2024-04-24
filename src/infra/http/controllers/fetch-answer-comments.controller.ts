import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common'
import { z } from 'zod'

import { ListAnswerCommentsUseCase } from '@/domain/forum/application/use-cases/comment/list-answer-comments'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

import { CommentPresenter } from '../presenters/comment-presenter'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1).positive())

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)
type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/answers/:answerId/comments')
export class FetchAnswerCommentsController {
  constructor(private listAnswerComments: ListAnswerCommentsUseCase) {}

  @Get()
  async handle(
    @Query('page', queryValidationPipe) page: PageQueryParamSchema,
    @Param('answerId') answerId: string,
  ) {
    const result = await this.listAnswerComments.execute({
      page,
      answerId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const answerComments = result.value.answerComments

    return {
      answerComments: answerComments.map(CommentPresenter.toHTTP),
    }
  }
}
