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
        return new Category(props)
    }

    changeName(name: string): void {
        this.name = name
    }

    changeDescription(description: string): void {
        this.description = description
    }

    activate() {
        this.isActive = true
    }

    deactivate() {
        this.isActive = false
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