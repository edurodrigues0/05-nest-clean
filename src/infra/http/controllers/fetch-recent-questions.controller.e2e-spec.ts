import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { QuestionFactory } from 'test/factories/make-question'
import { StudentFactory } from 'test/factories/make-student'

import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Fetch recent question (E2E)', () => {
  let app: INestApplication
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, QuestionFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    studentFactory = moduleRef.get(StudentFactory)
    questionFactory = moduleRef.get(QuestionFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[GET] /questions', async () => {
    const user = await studentFactory.makePrismaStudent()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    for (let i = 0; i <= 22; i++) {
      await questionFactory.makePrismaQuestion({
        title: `Question ${i}`,
        slug: Slug.create(`question-${i}`),
        content: `New content ${i}`,
        authorId: user.id,
      })
    }

    const response = await request(app.getHttpServer())
      .get('/questions?page=2')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.questions).toHaveLength(3)
  })
})
