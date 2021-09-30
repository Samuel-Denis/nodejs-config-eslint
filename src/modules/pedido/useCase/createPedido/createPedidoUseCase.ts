import { IOrderProductsDTO } from "@modules/pedido/DTOs/ordersProductsDTO";
import { IPedidosDTO } from "@modules/pedido/DTOs/pedidoDTO";
import { IOrdersPedidosRepositories } from "@modules/pedido/IRepositories/IOrdersProductsRepositories";
import { IPedidosRepositories } from "@modules/pedido/IRepositories/IPedidosRepositories";
import { IProductRespositories } from "@modules/product/IRepositories/IProductsRepositories";
import { AppError } from "@shared/errors/appError";
import { container, inject, injectable } from "tsyringe";
import { CreateOrderProductsUseCase } from "../createOrderProducts/createOrdersProductsUseCas";

interface IRequest {
    orderProducts: IOrderProductsDTO[]
}

interface IResponse {
    order: IPedidosDTO,
    orderProducts: IOrderProductsDTO[]
}

@injectable()
class CreatePedidoUseCase {

    constructor(
        @inject('PedidosRepositories')
        private pedidosRepositories: IPedidosRepositories,
        @inject('OrdersProductsRepositories')
        private ordersProductsRepositories: IOrdersPedidosRepositories,
        @inject('ProductsRepositories')
        private productRepository: IProductRespositories
    ){}

    async execute(user_id: string, orderProducts: IRequest): Promise<IResponse>{

      for(let i = 0; i < orderProducts.orderProducts.length; i++){
        const product = await this.productRepository.findById(orderProducts.orderProducts[i].product_id)

        if(!product){
            throw new AppError('Erro ao processar pedido, produto não encontrado !!!')
        }

        if(product.estoque < orderProducts.orderProducts[i].quantidade){
            throw new AppError('Erro ao processar pedido, quantidade do produto em estoque insuficiente')
        }

        product.estoque -= orderProducts.orderProducts[i].quantidade

        await this.productRepository.create(product)
      }

      const pedido =  await this.pedidosRepositories.create({user_id, valor_total: 0})

      if(!pedido){
        for(let i = 0; i < orderProducts.orderProducts.length; i++){
            const product = await this.productRepository.findById(orderProducts.orderProducts[i].product_id)
    
            product.estoque += orderProducts.orderProducts[i].quantidade
    
            await this.productRepository.create(product)
          }
          throw new AppError('Algo de errado acontenceu, tente mais tarde !!')
      }

      const createOrderProductsUseCase = container.resolve(CreateOrderProductsUseCase)

      for(let i = 0; i <  orderProducts.orderProducts.length; i++){
        
        await createOrderProductsUseCase.execute(
           orderProducts.orderProducts[i],
           pedido.id
           )
      }

      const listProductsOrder = await this.ordersProductsRepositories.list(pedido.id)

      let valor: number = 0 ;

      listProductsOrder.map( async (order) => {
            valor = valor + order.valor
      })

      pedido.valor_total = valor;

      const newOrder = await this.pedidosRepositories.create(pedido)

      const response : IResponse = {
          order: newOrder,
          orderProducts: listProductsOrder
      }

      return response
    }
}

export { CreatePedidoUseCase }