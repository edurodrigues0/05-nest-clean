import { HashComparer } from '@/domain/forum/application/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/forum/application/cryptography/hash-generator'

export class FakeHasher implements HashGenerator, HashComparer {
  async hash(plain: string): Promise<string> {
    const splitPlain = plain.split('')

    const reversePlain = splitPlain.reverse()

    const joinPlain = reversePlain.join('')

    return joinPlain
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    const splitPlain = plain.split('')

    const reversePlain = splitPlain.reverse()

    const joinPlain = reversePlain.join('')

    return joinPlain === hash
  }
}
