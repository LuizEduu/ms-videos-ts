import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator"
import { Category } from "../entities/category"
import { ClassValidatorFields } from "./class-validator-fields"

export class CategoryRules {
    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    name!: string
    
    @IsString()
    @IsOptional()
    description!: string | null

    @IsBoolean()
    @IsNotEmpty()
    isActive!: boolean

    constructor({ name, description, isActive }: Category) {
        Object.assign(this, {name, description, isActive})
    }
}


export class CategoryValidator extends ClassValidatorFields<CategoryRules>{
    validate(category: Category) {
        return super.validate(new CategoryRules(category))
    }
}

export class CategoryValidatorFactory {
    static create() {
        return new CategoryValidator()
    }
}