import { randomUUID } from "crypto"

export type CategoryProps = {
    id?: string
    name: string
    description: string | null
    isActive: boolean
    createdAt: Date
}

export type CategoryCreateCommand = {
    id?: string
    name: string
    description: string
    isActive: boolean
    createdAt: Date
}

export class Category {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    createdAt?: Date

    private constructor(props: CategoryProps) {
        this.id = props.id ?? randomUUID()
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
            id: this.id,
            name: this.name,
            description: this.description,
            isActive: this.isActive,
            createdAt: this.createdAt
        }
    }

}