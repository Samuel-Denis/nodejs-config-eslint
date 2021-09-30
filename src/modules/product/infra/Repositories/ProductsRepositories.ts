import { IProducts } from "@modules/product/DTOs/productsDTO";
import { IProductRespositories } from "@modules/product/IRepositories/IProductsRepositories";
import { getRepository, Repository } from "typeorm";
import { Product } from "../typeorm/entities/Product";

class ProductsRepositories implements IProductRespositories {

    private repository: Repository<Product>

    constructor(){
        this.repository = getRepository(Product)
    }
    async create({
        name,
        id,
        image,
        valor,
        description,
        estoque
    }: IProducts): Promise<Product> {
        const product = this.repository.create({
            name,
            id,
            image,
            valor,
            description,
            estoque  
        })

        return await this.repository.save(product)
    }

    async findByName(name: string): Promise<Product>{
        return await this.repository.findOne({name})
    }

    async list (): Promise<Product[]> {
        const all = await this.repository.find();

        return all
    }

     findById(id: string): Promise<Product>{
        return this.repository.findOne(id)
    }

}

export { ProductsRepositories }