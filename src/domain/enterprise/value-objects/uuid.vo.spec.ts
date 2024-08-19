import { randomUUID } from "crypto"
import { InvalidUuidError, Uuid } from "./uuid.vo"
import { MockInstance } from 'vitest'

describe('Uuid unit tests', () => {
    let validateSpy: MockInstance<any>
    beforeEach(() => {
        validateSpy  = vi.spyOn(Uuid.prototype as any, 'validate')

    })

    it('should throw error when uuid is invalid', () => {
        expect(() => {
            new Uuid('invalid-uuid')
        }).toThrowError(new InvalidUuidError())
        expect(validateSpy).toHaveBeenCalledTimes(1)
    })

    it('should be able to create a valid uuid', () => {
      const uuid = new Uuid()
      
      expect(uuid).toBeInstanceOf(Uuid)
      expect(validateSpy).toHaveBeenCalledTimes(1)
    })

    it('should be able to accept a valid uuid', () => {
        const existsId = randomUUID()
        const uuid = new Uuid(existsId)

        expect(uuid.value).toEqual(existsId)
        expect(validateSpy).toHaveBeenCalledTimes(1)
    })
})