import { Category } from "./category";
import { Uuid } from "../value-objects/uuid.vo";
import { MockInstance } from "vitest";
import { EntityValidationError } from "../validators/errors/validation.error";

describe("Category Unit Tests", () => {
  let validateSpy: MockInstance;

  beforeEach(() => {
    validateSpy = vitest.spyOn(Category, "validate");
  });

  it("create category", () => {
    const category = Category.create({
      name: "Movie",
      description: "categoria de filmes",
      isActive: true,
    });

    expect(category).toBeInstanceOf(Category);
    expect(category.id.value).toEqual(expect.any(String));
    expect(category.name).toEqual("Movie");
    expect(category.description).toEqual("categoria de filmes");
    expect(category.isActive).toBe(true);
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  it("should be able to create a new category when pass id", () => {
    const id = Uuid.create();
    const category = new Category({
      id,
      name: "Movie",
      description: "categoria de filmes",
      isActive: true,
    });

    expect(category).toBeInstanceOf(Category);
    expect(category.id.value).toEqual(id.value);
    expect(category.name).toEqual("Movie");
    expect(category.description).toEqual("categoria de filmes");
    expect(category.isActive).toBe(true);
    expect(category.createdAt?.getMilliseconds()).toBeLessThanOrEqual(
      new Date().getMilliseconds()
    );
  });

  it("should be able to active a category", () => {
    const category = Category.create({
      name: "Movie",
      description: "categoria de filmes",
      isActive: false,
    });

    expect(category.isActive).toEqual(false);
    category.activate();
    expect(category.isActive).toEqual(true);
  });

  it("should be able to deactivate a category", () => {
    const category = Category.create({
      name: "Movie",
      description: "categoria de filmes",
      isActive: true,
    });

    expect(category.isActive).toEqual(true);
    category.deactivate();
    expect(category.isActive).toEqual(false);
  });

  it("should be able to change category name", () => {
    const category = Category.create({
      name: "Movie",
      description: "categoria de filmes",
      isActive: true,
    });

    expect(category.name).toEqual("Movie");
    category.changeName("Series");
    expect(category.name).toEqual("Series");
    expect(validateSpy).toHaveBeenCalledTimes(2);
  });

  it("should be able to change category description", () => {
    const category = Category.create({
      name: "Movie",
      description: "categoria de filmes",
      isActive: true,
    });

    expect(category.description).toEqual("categoria de filmes");
    category.changeDescription("categorias de series mais assistidas");
    expect(category.description).toEqual(
      "categorias de series mais assistidas"
    );
    expect(validateSpy).toHaveBeenCalledTimes(2);
  });
});

describe("Create command", () => {
  it("should not be able to create a category when name property is invalid", () => {
    expect(() =>
      Category.create({
        isActive: true,
        description: "any_description",
        name: null as any,
      })
    ).containsErrorMessage({
      name: [
        "name should not be empty",
        "name must be a string",
        "name must be shorter than or equal to 255 characters",
      ],
    });
  });

  it("should not be able to create a category when name property is empty", () => {
    expect(() =>
      Category.create({
        isActive: true,
        description: "any_description",
        name: "",
      })
    ).containsErrorMessage({
      name: ["name should not be empty"],
    });
  });

  it("should not be able to create a category when name property is bigger 255 characters", () => {
    expect(() =>
      Category.create({
        isActive: true,
        description: "any_description",
        name: "aaa".repeat(300),
      })
    ).containsErrorMessage({
      name: ["name must be shorter than or equal to 255 characters"],
    });
  });

  it("should not be able to create a category when description property is invalid", () => {
    expect(() =>
      Category.create({
        isActive: true,
        description: null as any,
        name: "John Doe",
      })
    ).containsErrorMessage({
      name: [
        "description should not be empty",
        "description must be a string",
        "description must be shorter than or equal to 255 characters",
      ],
    });
  });

  it("should not be able to create a category when description property is empty", () => {
    expect(() =>
      Category.create({
        isActive: true,
        description: "",
        name: "John Doe",
      })
    ).containsErrorMessage({
      name: ["description should not be empty"],
    });
  });

  it("should not be able to create a category when description property is bigger 255 characters", () => {
    expect(() =>
      Category.create({
        isActive: true,
        description: "aaa".repeat(300),
        name: "John Doe",
      })
    ).containsErrorMessage({
      name: ["description must be shorter than or equal to 255 characters"],
    });
  });

  it("should not be able to create a category when isActive invalid", () => {
    expect(() =>
      Category.create({
        name: "Filmes",
        description: "Filmes mais assistidos",
        isActive: 1 as any,
      })
    ).containsErrorMessage({
      isActive: ["isActive must be a boolean value"],
    });
  });
});
