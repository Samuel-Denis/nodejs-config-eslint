import { CategoryDTO } from "../DTOs/categoryDTO";
import { Category } from "../infra/typeorm/entities/category";


interface ICategoriesRepositories {
     create ({name, image, id}: CategoryDTO): Promise<void>;
     list(): Promise<Category[]>
     findByName(name: string): Promise<Category>
}

export { ICategoriesRepositories }