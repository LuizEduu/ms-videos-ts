export type FieldsErrors = Record<string, string[]>

export interface ValidatorFields<PropsValidated> {
    errors: FieldsErrors | null
    validatedData: PropsValidated | null
    validate(data: any): boolean
}