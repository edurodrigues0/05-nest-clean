import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { z } from 'zod'

import { ListRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/question/list-recent-questions'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1).positive())

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)
type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class FetchRecentQuestionsController {
  constructor(private listRecentQuestions: ListRecentQuestionsUseCase) {}

  @Get()
  async handle(@Query('page', queryValidationPipe) page: PageQueryParamSchema) {
    const questions = await this.listRecentQuestions.execute({
      page,
    })

    return {
      questions,
    }
  }
}
