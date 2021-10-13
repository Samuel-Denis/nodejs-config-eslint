import { ICartRepositories } from "@modules/carrinho/IRepositories/IRepositoriesCart";
import { ICartProductsRepositories } from "@modules/carrinho/IRepositories/IRepositoriesCartProducts";
import { AppError } from "@shared/errors/appError";
import { inject, injectable } from "tsyringe";

interface IRequest{
    user_id: string;
    product_id: string
}

@injectable()
class RemoveItemDoCarrinhoUserUseCase {

    constructor(
        @inject('CartRepositories')
        private cartRepositories: ICartRepositories,
        @inject('CarProductsRepositories')
        private cartProductsRepositories: ICartProductsRepositories,
    ){}

     async execute({user_id, product_id}: IRequest): Promise<void>{

         const cartUserExists = await this.cartRepositories.findByUserId(user_id);

         if(!cartUserExists){
             throw new AppError('Erro ao processar ação');
         }

         await this.cartProductsRepositories.removeItem(product_id);
 }
}

export { RemoveItemDoCarrinhoUserUseCase }