import { EntityError } from "@/core/errors/entity-error"
import { FieldsErrors } from "../class-validator-interface";

export class EntityValidationError extends EntityError {
    constructor(public error: FieldsErrors, message = 'Validation Error') {
        super(message)
        this.name = 'EntityValidationError'
    }

    count() {
        return Object.keys(this.error).length
    }
}