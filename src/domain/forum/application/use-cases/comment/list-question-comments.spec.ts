import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ListQuestionCommentsUseCase } from './list-question-comments'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { makeQuestionComment } from 'test/factories/make-question-comment'

let inMemoryQuestionCommentRepository: InMemoryQuestionCommentsRepository
let sut: ListQuestionCommentsUseCase

describe('List Question Comments', () => {
  beforeEach(() => {
    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentsRepository()
    sut = new ListQuestionCommentsUseCase(inMemoryQuestionCommentRepository)
  })

  it('should be able to list recent comment', async () => {
    await inMemoryQuestionCommentRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityID('question-01'),
      }),
    )

    await inMemoryQuestionCommentRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityID('question-01'),
      }),
    )

    await inMemoryQuestionCommentRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityID('question-01'),
      }),
    )

    const result = await sut.execute({
      questionId: 'question-01',
      page: 1,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.questionComments).toHaveLength(3)
  })

  it('should be able to list paginated question comment', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentRepository.create(
        makeQuestionComment({
          questionId: new UniqueEntityID('question-01'),
        }),
      )
    }

    const result = await sut.execute({
      questionId: 'question-01',
      page: 2,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.questionComments).toHaveLength(2)
  })
})
