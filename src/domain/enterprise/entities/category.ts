import { CategoryValidatorFactory } from "../validators/category.validator"
import { Uuid } from "../value-objects/uuid.vo"

export type CategoryProps = {
    id?: Uuid
    name: string
    description: string | null
    isActive: boolean
    createdAt?: Date
}

export type CategoryCreateCommand = {
    name: string
    description: string
    isActive: boolean
}

export class Category {
    id: Uuid
    name: string
    description?: string | null
    isActive?: boolean
    createdAt?: Date

    constructor(props: CategoryProps) {
        this.id = props.id ?? Uuid.create()
        this.name = props.name
        this.description = props.description
        this.isActive = props.isActive ?? true
        this.createdAt = props.createdAt ?? new Date()
    }

    static create(props: CategoryCreateCommand): Category {
        const category = new Category(props)
        Category.validate(category)
        return category
    }

    changeName(name: string): void {
        this.name = name
        Category.validate(this)
    }

    changeDescription(description: string): void {
        this.description = description
        Category.validate(this)
    }

    activate() {
        this.isActive = true
    }

    deactivate() {
        this.isActive = false
    }

    static validate(entity: Category) {
        const validator = CategoryValidatorFactory.create()

        validator.validate(entity)
    }

    toJSON() {
        return {
            id: this.id.value,
            name: this.name,
            description: this.description,
            isActive: this.isActive,
            createdAt: this.createdAt
        }
    }

}