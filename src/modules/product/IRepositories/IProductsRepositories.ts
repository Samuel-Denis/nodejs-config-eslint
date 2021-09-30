import { IProducts } from "../DTOs/productsDTO";
import { Product } from "../infra/typeorm/entities/Product";

interface IProductRespositories {
    create(data: IProducts): Promise<Product>
    findByName(name: string): Promise<Product>
    list(): Promise<Product[]>
    findById(name: string): Promise<Product>
}


export { IProductRespositories }