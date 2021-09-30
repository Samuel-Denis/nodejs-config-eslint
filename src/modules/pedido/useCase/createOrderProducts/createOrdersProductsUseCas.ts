import { IOrderProductsDTO } from "@modules/pedido/DTOs/ordersProductsDTO";
import { IOrdersPedidosRepositories } from "@modules/pedido/IRepositories/IOrdersProductsRepositories";
import { IProductRespositories } from "@modules/product/IRepositories/IProductsRepositories";
import { AppError } from "@shared/errors/appError";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateOrderProductsUseCase {
   
    constructor(
        @inject('OrdersProductsRepositories')
        private ordersProductsRepositories: IOrdersPedidosRepositories,
        @inject('ProductsRepositories')
        private productRepository: IProductRespositories
    ){}

    async execute(order: IOrderProductsDTO, pedido_id: string) : Promise<void>{
        
        const product = await this.productRepository.findById(order.product_id)

        if(!product){
                product.estoque += order.quantidade
                await this.productRepository.create(product)
            throw new AppError('Erro ao processar pedido, produto não encontrado !!!')
        }

        order.pedido_id = pedido_id
        order.valor = order.quantidade * product.valor

       await this.ordersProductsRepositories.create(order)}
}

export { CreateOrderProductsUseCase }