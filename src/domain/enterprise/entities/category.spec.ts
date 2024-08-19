import { randomUUID } from "crypto"
import { Category } from "./category"
import { Uuid } from "../value-objects/uuid.vo"

describe('Category Unit Tests', () => {
    it('create category', () => {
        const category = Category.create({
            name: 'Movie',
            description: 'categoria de filmes',
            isActive: true,
        })

        expect(category).toBeInstanceOf(Category)
        expect(category.id.value).toEqual(expect.any(String))
        expect(category.name).toEqual('Movie')
        expect(category.description).toEqual('categoria de filmes')
        expect(category.isActive).toBe(true)
    })

    it('should be able to create a new category when pass id', () => {
        const id = Uuid.create()
        const category = new Category({
            id,
            name: 'Movie',
            description: 'categoria de filmes',
            isActive: true,
        })

        expect(category).toBeInstanceOf(Category)
        expect(category.id.value).toEqual(id.value)
        expect(category.name).toEqual('Movie')
        expect(category.description).toEqual('categoria de filmes')
        expect(category.isActive).toBe(true)
        expect(category.createdAt?.getMilliseconds()).toBeLessThanOrEqual(new Date().getMilliseconds())
    })

    it('should be able to active a category', () => {
        const category = Category.create({
            name: 'Movie',
            description: 'categoria de filmes',
            isActive: false,
        })

        expect(category.isActive).toEqual(false)
        category.activate()
        expect(category.isActive).toEqual(true)
    })

    it('should be able to deactivate a category', () => {
        const category = Category.create({
            name: 'Movie',
            description: 'categoria de filmes',
            isActive: true,
        })

        expect(category.isActive).toEqual(true)
        category.deactivate()
        expect(category.isActive).toEqual(false)
    })

    it('should be able to change category name', () => {
        const category = Category.create({
            name: 'Movie',
            description: 'categoria de filmes',
            isActive: true,
        })

        expect(category.name).toEqual("Movie")
        category.changeName("Series")
        expect(category.name).toEqual("Series")
    })

    it('should be able to change category description', () => {
        const category = Category.create({
            name: 'Movie',
            description: 'categoria de filmes',
            isActive: true,
        })

        expect(category.description).toEqual("categoria de filmes")
        category.changeDescription("categorias de series mais assistidas")
        expect(category.description).toEqual("categorias de series mais assistidas")
    })
})