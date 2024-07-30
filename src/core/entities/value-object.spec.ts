import { ValueObject } from "./value-object"

class StringValueObject extends ValueObject {
    constructor(readonly value: string) {
        super()
    }
}

class MultiPropsValueObject extends ValueObject {
    constructor(readonly prop1: string, readonly prop2: number) {
        super()
    }
}

describe('Value object Unit Tests', () => {
    it('should be able to compare value objects is equals', () => {
        const v1 = new StringValueObject("any_name")
        const v2 = new StringValueObject("any_name")

        expect(v1.equals(v2)).toBe(true)
    })

    it('should be able to compare value objects is not equals', () => {
        const v1 = new StringValueObject("any_name")
        const v2 = new StringValueObject("any_name2")

        expect(v1.equals(v2)).toBe(false)
    })

    it('should be able to compare multi props value object is equals', () => {
        const multiPropsV1 = new MultiPropsValueObject("valor 1", 20)
        const multiPropsV2 = new MultiPropsValueObject("valor 1", 20)

        expect(multiPropsV1.equals(multiPropsV2)).toBe(true)
    })

    it('should be able to compare multi props value object is not equals', () => {
        const multiPropsV1 = new MultiPropsValueObject("valor 1", 20)
        const multiPropsV2 = new MultiPropsValueObject("valor 1", 29)

        expect(multiPropsV1.equals(multiPropsV2)).toBe(false)
    })

    it('should be able to compare multi props value object when null is not equals', () => {
        const multiPropsV1 = new MultiPropsValueObject("valor 1", 20)

        expect(multiPropsV1.equals(null as any)).toBe(false)
    })

    it('should be able to compare multi props value object when undefined is not equals', () => {
        const multiPropsV1 = new MultiPropsValueObject("valor 1", 20)

        expect(multiPropsV1.equals(undefined as any)).toBe(false)
    })


})