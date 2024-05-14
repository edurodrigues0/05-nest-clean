import { QuestionDetails } from '@/domain/forum/enterprise/entities/value-objects/question-details'

import { AttachmentPresenter } from './attachment-presenter'

export class QuestionDetailsPresenter {
  static toHTTP(questionDetails: QuestionDetails) {
    return {
      questionId: questionDetails.questionId.toString(),
      authorId: questionDetails.authorId.toString(),
      author: questionDetails.author,
      title: questionDetails.title,
      contet: questionDetails.content,
      slug: questionDetails.slug.value,
      best_answer_id: questionDetails.bestAnswerId?.toString(),
      created_at: questionDetails.createdAt,
      updated_at: questionDetails.updatedAt,
      attachments: questionDetails.attachments.map(AttachmentPresenter.toHTTP),
    }
  }
}
