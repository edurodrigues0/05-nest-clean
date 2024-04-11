import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Fetch recent question (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[GET] /questions', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoe@test.com',
        password: '123456',
      },
    })

    const accessToken = jwt.sign({ sub: user.id })

    for (let i = 0; i <= 22; i++) {
      await prisma.question.create({
        data: {
          title: `Question ${i}`,
          slug: `question-${i}`,
          content: `New content ${i}`,
          authorId: user.id,
        },
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
