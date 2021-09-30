import 'reflect-metadata';
import { Router } from 'express';

import { categoriesRoutes } from './categories.routes';
import { usersRoutes } from './users.routes';
import { authenticateRoutes} from './authenticate.routes'
import { productsRouters } from './products.routes'
import { pedidoRouters } from './pedido.routes'
import { passwordRoutes } from './password.routes';

const router = Router();

router.use('/categories', categoriesRoutes);
router.use('/users', usersRoutes);
router.use('/authenticate', authenticateRoutes);
router.use('/products', productsRouters);
router.use("/password", passwordRoutes);
router.use('/pedido', pedidoRouters)

export { router };
