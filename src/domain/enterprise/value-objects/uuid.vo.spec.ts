import { randomUUID } from "crypto"
import { InvalidUuidError, Uuid } from "./uuid.vo"

describe('Uuid unit tests', () => {
    it('should throw error when uuid is invalid', () => {
        expect(() => {
            new Uuid('invalid-uuid')
        }).toThrowError(new InvalidUuidError())
    })

    it('should be able to create a valid uuid', () => {
      const uuid = new Uuid()
      
      expect(uuid).toBeInstanceOf(Uuid)
    })

    it('should be able to accept a valid uuid', () => {
        const existsId = randomUUID()
        const uuid = new Uuid(existsId)

        expect(uuid.id).toEqual(existsId)
    })
})