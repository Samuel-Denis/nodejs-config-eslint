import { Request, Response} from 'express'
import { container } from 'tsyringe'
import { RemoveItemDoCarrinhoUserUseCase } from './removerItemDoCarrinhoUseCase'

class RemoveItemDoCarrinhoController {

    async handler(req: Request, res: Response): Promise<Response> {
        const { id } = req.user

        const { product_id, quantidade } = req.body

        const createPedidoUseCase = container.resolve(RemoveItemDoCarrinhoUserUseCase)

        const response = await createPedidoUseCase.execute({
            product_id,
            user_id: id
        })


        return res.json(response);
    }
}


export { RemoveItemDoCarrinhoController }