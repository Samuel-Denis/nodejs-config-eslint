import { CreatePedidoController } from '@modules/pedido/useCase/createPedido/createPedidoController'
import { ListarPedidoController } from '@modules/pedido/useCase/listarPedidos/listarPedidosController';
import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAthenticare';

const pedidoRouters = Router()


const createPedidoController = new CreatePedidoController()
const listarPedidoController = new ListarPedidoController()

pedidoRouters.post(
    '/',
    ensureAuthenticated,
    createPedidoController.handler);

pedidoRouters.get(
    '/',
    ensureAuthenticated,
    listarPedidoController.handler
    )


export { pedidoRouters }