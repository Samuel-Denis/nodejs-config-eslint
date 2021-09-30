import { IPedidosDTO } from "@modules/pedido/DTOs/pedidoDTO";
import { IPedidosRepositories } from "@modules/pedido/IRepositories/IPedidosRepositories";
import { getRepository, Repository } from "typeorm";
import { Pedido } from "../typeorm/entities/pedido";


class PedidosRepositories implements IPedidosRepositories {

    private repository: Repository<Pedido>;

    constructor(){
        this.repository = getRepository(Pedido);
    }

    async create({
        user_id,
        valor_total,
        id
    }: IPedidosDTO ): Promise<Pedido> {
        const order = this.repository.create({ id, user_id, valor_total})

        await this.repository.save(order);

        return order
    }
    async list(user_id: string): Promise<Pedido[]> {
        return await this.repository.find({user_id})
    }
}

export { PedidosRepositories }