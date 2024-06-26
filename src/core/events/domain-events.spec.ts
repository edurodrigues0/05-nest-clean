import { vi } from 'vitest'

import { AggregateRoot } from '../entities/aggregate-root'
import { UniqueEntityID } from '../entities/unique-entity-id'
import { DomainEvent } from './domain-event'
import { DomainEvents } from './domain-events'

class CustomAggregateCreated implements DomainEvent {
  public ocurredAt: Date
  private aggregate: CustomAggregate // eslint-disable-line

  constructor(aggregate: CustomAggregate) {
    this.aggregate = aggregate
    this.ocurredAt = new Date()
  }

  public getAggregateId(): UniqueEntityID {
    return this.aggregate.id
  }
}

class CustomAggregate extends AggregateRoot<null> {
  static create() {
    const aggregate = new CustomAggregate(null)

    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate))

    return aggregate
  }
}

describe('domain events', () => {
  it('should be able to dispatch and listen to event', () => {
    const callbackSpy = vi.fn()

    // Subscriber cadastrado( ouvindo o evento de "resposta criada" )
    DomainEvents.register(callbackSpy, CustomAggregateCreated.name)

    // Estou criando uma resposta porem SEM salvar no banco
    const aggregate = CustomAggregate.create()

    // Estou assegurando que o evento foi criado porem NAO foi disparado
    expect(aggregate.domainEvents).toHaveLength(1)

    // Estou salvando a resposta no banco de dados e assim disparando
    DomainEvents.dispatchEventsForAggregate(aggregate.id)

    // Estou assegurando que a resposta FOI disparada apos salvar no banco de dados
    expect(callbackSpy).toHaveBeenCalled()

    // Estou assegurando que a lista de eventos ficou vazia apos concluido
    expect(aggregate.domainEvents).toHaveLength(0)
  })
})
