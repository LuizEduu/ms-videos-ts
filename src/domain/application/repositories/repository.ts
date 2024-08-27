import { Entity } from "@/core/entities/entity";
import { ValueObject } from "@/core/entities/value-object";

export abstract class Repository<
  E extends Entity,
  EntityId extends ValueObject
> {
  abstract insert(entity: E): Promise<void>;
  abstract findById(entityId: EntityId): Promise<E | null>;
  abstract findAll(): Promise<E[]>;
  abstract update(entity: E): Promise<void>;
  abstract delete(entityId: EntityId): Promise<void>;

  abstract getEntityId(): new (...args: any[]) => E;
}
