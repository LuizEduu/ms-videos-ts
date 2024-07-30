import { randomUUID } from "crypto"
import { Category } from "./category"

describe('Category Unit Tests', () => {
    it('create category', () => {
        const id = randomUUID()
        const now = new Date()

        const category = Category.create({
            id,
            name: 'Movie',
            description: 'categoria de filmes',
            isActive: true,
            createdAt: now
        })

        expect(category).toBeInstanceOf(Category)
        expect(category.id).toEqual(id)
        expect(category.name).toEqual('Movie')
        expect(category.description).toEqual('categoria de filmes')
        expect(category.createdAt).toEqual(now)
    })

    it('should be able to active a category', () => {
        const id = randomUUID()
        const now = new Date()

        const category = Category.create({
            id,
            name: 'Movie',
            description: 'categoria de filmes',
            isActive: false,
            createdAt: now
        })

        expect(category.isActive).toEqual(false)
        category.activate()
        expect(category.isActive).toEqual(true)
    })

    it('should be able to deactivate a category', () => {
        const id = randomUUID()
        const now = new Date()

        const category = Category.create({
            id,
            name: 'Movie',
            description: 'categoria de filmes',
            isActive: true,
            createdAt: now
        })

        expect(category.isActive).toEqual(true)
        category.deactivate()
        expect(category.isActive).toEqual(false)
    })

    it('should be able to change category name', () => {
        const id = randomUUID()
        const now = new Date()

        const category = Category.create({
            id,
            name: 'Movie',
            description: 'categoria de filmes',
            isActive: true,
            createdAt: now
        })

        expect(category.name).toEqual("Movie")
        category.changeName("Series")
        expect(category.name).toEqual("Series")
    })

    it('should be able to change category description', () => {
        const id = randomUUID()
        const now = new Date()

        const category = Category.create({
            id,
            name: 'Movie',
            description: 'categoria de filmes',
            isActive: true,
            createdAt: now
        })

        expect(category.description).toEqual("categoria de filmes")
        category.changeDescription("categorias de series mais assistidas")
        expect(category.description).toEqual("categorias de series mais assistidas")
    })
})