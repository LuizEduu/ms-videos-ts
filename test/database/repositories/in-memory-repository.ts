import { Entity } from "@/core/entities/entity";
import { ValueObject } from "@/core/entities/value-object";
import { Repository } from "@/domain/application/repositories/repository";

export abstract class InMemoryRepository<
  E extends Entity,
  EntityId extends ValueObject
> implements Repository<E, EntityId>
{
  items: E[] = [];

  async insert(entity: E): Promise<void> {
    this.items.push(entity);
  }

  async findById(entityId: EntityId): Promise<E | null> {
    const item = this.items.find((e) => e.entityId.equals(entityId));

    return item ?? null;
  }

  async findAll(): Promise<E[]> {
    return this.items;
  }

  async update(entity: E): Promise<void> {
    const index = this.items.findIndex((e) =>
      e.entityId.equals(entity.entityId)
    );

    if (index === -1) {
      return;
    }

    this.items[index] = entity;
  }

  async delete(entityId: EntityId): Promise<void> {
    const index = this.items.findIndex((e) => e.entityId.equals(entityId));

    this.items.splice(index, 1);
  }

  abstract getEntityId(): new (...args: any[]) => E;
}
