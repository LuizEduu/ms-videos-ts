import { Category } from "@/domain/enterprise/entities/category";
import { Repository } from "./repository";
import { Uuid } from "@/domain/enterprise/value-objects/uuid.vo";

export abstract class CategoryRepository extends Repository<Category, Uuid> {}
