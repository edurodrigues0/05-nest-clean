import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'

import { DeleteQuestionCommentUseCase } from '@/domain/forum/application/use-cases/comment/delete-question-comment'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayLoad } from '@/infra/auth/jwt-strategy'

@Controller('/questions/comments/:id')
export class DeleteQuestionCommentController {
  constructor(private deleteQuestionComment: DeleteQuestionCommentUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayLoad,
    @Param('id') questionCommentId: string,
  ) {
    const { sub: userId } = user

    const result = await this.deleteQuestionComment.execute({
      questionCommentId,
      authorId: userId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
