import { IOrderProductsDTO } from "@modules/pedido/DTOs/ordersProductsDTO";
import { IPedidosDTO } from "@modules/pedido/DTOs/pedidoDTO";
import { IOrdersPedidosRepositories } from "@modules/pedido/IRepositories/IOrdersProductsRepositories";
import { IPedidosRepositories } from "@modules/pedido/IRepositories/IPedidosRepositories";
import { inject, injectable } from "tsyringe";

interface IResponse {
    order: IPedidosDTO,
    orderProducts: IOrderProductsDTO[]
}

@injectable()
class ListarPedidosUseCase {
    
    constructor(
        @inject('PedidosRepositories')
        private pedidosRepositories: IPedidosRepositories,
        @inject('OrdersProductsRepositories')
        private ordersProductsRepositories: IOrdersPedidosRepositories,
    ){}
    async execute(user_id: string): Promise<IResponse[]> {

        const pedido = await this.pedidosRepositories.list(user_id)

        const newPedido: IResponse[] = []

        for(let i = 0; i < pedido.length; i++){

            const orderProducts = await this.ordersProductsRepositories.list(pedido[i].id)

           const p: IResponse = {
            order : pedido[i],
            orderProducts : orderProducts
           }
            
            newPedido.push(p)
        }

        return newPedido
    }
}

export { ListarPedidosUseCase }