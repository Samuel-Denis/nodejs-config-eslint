import { IOrderProductsDTO } from "@modules/pedido/DTOs/ordersProductsDTO";
import { IPedidosDTO } from "@modules/pedido/DTOs/pedidoDTO";
import { IOrdersPedidosRepositories } from "@modules/pedido/IRepositories/IOrdersProductsRepositories";
import { IPedidosRepositories } from "@modules/pedido/IRepositories/IPedidosRepositories";
import { IProductRespositories } from "@modules/product/IRepositories/IProductsRepositories";
import { AppError } from "@shared/errors/appError";
import { container, inject, injectable } from "tsyringe";
import { CreateOrderProductsUseCase } from "../createOrderProducts/createOrdersProductsUseCas";
import { ListarCarrinhoUseCase } from '@modules/carrinho/useCases/list/listarCarrinhoUseCase';
import { ICartRepositories } from "@modules/carrinho/IRepositories/IRepositoriesCart";

interface IRequest {
    user_id: string,
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
        private productRepository: IProductRespositories,
        @inject('CartRepositories')
        private cartsRepositories: ICartRepositories,
    ){}

    async execute({ user_id }: IRequest): Promise<IResponse>{

       const itemsPedido : IOrderProductsDTO[] = [];

       const listarCarrinhoUseCase = container.resolve(ListarCarrinhoUseCase);
   
       const productsOrder = await listarCarrinhoUseCase.execute(user_id);
      
       if(!productsOrder){
        throw new AppError('Erro ao realizar pedido, tente mais tarde')
       }
     
      for(let i = 0; i < productsOrder.length; i++){
        const product = await this.productRepository.findById(productsOrder[i].product.id)
        console.log(i)
        if(!product){
            throw new AppError('Erro ao processar pedido, produto não encontrado !!!')
        }
        if(product.estoque < productsOrder[i].quantidade){
            throw new AppError('Erro ao processar pedido, quantidade do produto em estoque insuficiente')
        }
        product.estoque -= productsOrder[i].quantidade
        
        await this.productRepository.create(product)
      }
      const pedido =  await this.pedidosRepositories.create({user_id, valor_total: 0})
     
      if(!pedido){
        for(let i = 0; i < productsOrder.length; i++){
            const product = await this.productRepository.findById(productsOrder[i].product.id)
            
            product.estoque += productsOrder[i].quantidade
            
            await this.productRepository.create(product)
          }
          throw new AppError('Algo de errado acontenceu, tente mais tarde !!')
      }
      
      for(let i = 0; i < productsOrder.length; i++){
        const p : IOrderProductsDTO = {
            pedido_id: pedido.id,
            product: productsOrder[i].product,
            quantidade: productsOrder[i].quantidade
        }
           itemsPedido.push(p)
       }
       
      const createOrderProductsUseCase = container.resolve(CreateOrderProductsUseCase)

      for(let i = 0; i <  itemsPedido.length; i++){
        
        await createOrderProductsUseCase.execute(
           itemsPedido[i],
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

      await this.cartsRepositories.removeCartUser(user_id);
      
      return response
    }
}

export { CreatePedidoUseCase }