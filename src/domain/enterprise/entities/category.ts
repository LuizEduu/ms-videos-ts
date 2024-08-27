import { Entity } from "@/core/entities/entity";
import { CategoryValidatorFactory } from "../validators/category.validator";
import { EntityValidationError } from "../validators/errors/validation.error";
import { Uuid } from "../value-objects/uuid.vo";
import { ValueObject } from "@/core/entities/value-object";

export type CategoryProps = {
  id?: Uuid;
  name: string;
  description: string | null;
  isActive: boolean;
  createdAt?: Date;
};

export type CategoryCreateCommand = {
  name: string;
  description: string;
  isActive: boolean;
};

export class Category extends Entity {
  id: Uuid;
  name: string;
  description?: string | null;
  isActive?: boolean;
  createdAt?: Date;

  constructor(props: CategoryProps) {
    super();
    this.id = props.id ?? Uuid.create();
    this.name = props.name;
    this.description = props.description;
    this.isActive = props.isActive ?? true;
    this.createdAt = props.createdAt ?? new Date();
  }

  get entityId(): ValueObject {
    return this.id;
  }

  static create(props: CategoryCreateCommand): Category {
    const category = new Category(props);
    Category.validate(category);
    return category;
  }

  changeName(name: string): void {
    this.name = name;
    Category.validate(this);
  }

  changeDescription(description: string): void {
    this.description = description;
    Category.validate(this);
  }

  activate() {
    this.isActive = true;
  }

  deactivate() {
    this.isActive = false;
  }

  static validate(entity: Category) {
    const validator = CategoryValidatorFactory.create();

    const isValid = validator.validate(entity);

    if (!isValid && validator.errors) {
      throw new EntityValidationError(validator.errors);
    }
  }

  toJSON() {
    return {
      id: this.id.value,
      name: this.name,
      description: this.description,
      isActive: this.isActive,
      createdAt: this.createdAt,
    };
  }
}
