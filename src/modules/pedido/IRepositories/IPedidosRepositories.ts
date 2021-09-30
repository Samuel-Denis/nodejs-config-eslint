import { IPedidosDTO } from "../DTOs/pedidoDTO";
import { Pedido } from "../infra/typeorm/entities/pedido";


interface IPedidosRepositories {
    create(data: IPedidosDTO): Promise<Pedido>
    list(user_id: string): Promise<Pedido[]>
}

export { IPedidosRepositories }