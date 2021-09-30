import { IProducts } from "@modules/product/DTOs/productsDTO"
import { Product } from "@modules/product/infra/typeorm/entities/Product"
import { IProductRespositories } from "@modules/product/IRepositories/IProductsRepositories"
import { AppError } from "@shared/errors/appError"
import { inject, injectable } from "tsyringe"

@injectable()
class ProductUseCase {

    constructor(
        @inject('ProductsRepositories')
        private productRepository: IProductRespositories
    ){}

    async execute({
        name,
        valor,
        description,
        estoque
    }: IProducts): Promise<Product>{

        const product = await this.productRepository.findByName(name)

        if(product){
            throw new AppError('Produto já existente')
        }

       return await this.productRepository.create({        
            name,
            valor,
            description,
            estoque
        })
    }
}

export { ProductUseCase }