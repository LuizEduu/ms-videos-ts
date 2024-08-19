import { ValueObject } from "@/core/entities/value-object";
import {v4, validate as uuidValidate} from "uuid"

export class Uuid extends ValueObject {
    readonly value: string

    constructor(id?: string) {
        super()
        this.value = id ?? v4()
        this.validate()
    }

    private validate() {
        const isValid = uuidValidate(this.value)
        if (!isValid) {
            throw new InvalidUuidError()
        }
    }

    static create() {
        return new Uuid()
    }
}

export class InvalidUuidError extends Error {
    constructor(message?: string) {
        super(message || 'ID must be a valid UUID')
        this.name = "InvalidUuidError"
    }
}