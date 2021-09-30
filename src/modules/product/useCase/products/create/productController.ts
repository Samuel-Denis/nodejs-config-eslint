import  { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ProductUseCase } from './productUseCase';


class ProductController {

    async handler(req: Request, res: Response): Promise<Response>{
        const {
            name,
            valor,
            description,
            estoque
        } = req.body

        const productUseCade = container.resolve(ProductUseCase);

        const p = await productUseCade.execute({
            name,
            valor,
            description,
            estoque
        })

        return res.status(201).json(p.id);
    }
    
}

export { ProductController }