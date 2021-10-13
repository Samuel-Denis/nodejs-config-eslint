import { ICartRepositories } from "@modules/carrinho/IRepositories/IRepositoriesCart";
import { ICartProductsRepositories } from "@modules/carrinho/IRepositories/IRepositoriesCartProducts";
import { Product } from "@modules/product/infra/typeorm/entities/Product";
import { IProductRespositories } from "@modules/product/IRepositories/IProductsRepositories";
import { AppError } from "@shared/errors/appError";
import { inject, injectable } from "tsyringe";

interface IResponse {
    product: Product,
    quantidade: number
}

@injectable()
class ListarCarrinhoUseCase {
    
    constructor(
        @inject('CartRepositories')
        private cartsRepositories: ICartRepositories,
        @inject('CarProductsRepositories')
        private cartProductsRepositories: ICartProductsRepositories,
        @inject('ProductsRepositories')
        private productRepository: IProductRespositories
    ){}
    async execute(user_id: string): Promise<IResponse[]> {
        
        const carrinho = await this.cartsRepositories.findByUserId(user_id)
        
        if(!carrinho){
            throw new AppError('Carrinho vazio')
        }
        
        const listCarProducts = await this.cartProductsRepositories.list(carrinho.id)
        
        if(!listCarProducts){
            throw new AppError('Carrinho vazio')
        }
        
        const newCart: IResponse[] = [];
        
        for(let i = 0; i < listCarProducts.length; i++){
            
            const prod = await this.productRepository.findById(listCarProducts[i].product_id)
            
            const p: IResponse = {
                product : prod,
                quantidade : listCarProducts[i].quantidade
               }             
                newCart.push(p)
        }
        
        return newCart;
    }
}

export { ListarCarrinhoUseCase }