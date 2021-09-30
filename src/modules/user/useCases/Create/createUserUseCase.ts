import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { ICreateUser } from "@modules/user/DTOs/createUserDTO";
import { IUserRepository } from "@modules/user/IRepositories/IUserRepository";
import { AppError } from "@shared/errors/appError";

@injectable()
class CreateUserUseCase {

    constructor(
        @inject('UserRepository')
        private usersRepository: IUserRepository,
    ){}
    async execute({
        name,
        password,
        email,
    }: ICreateUser): Promise<void> {

        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        if (userAlreadyExists) {
          throw new AppError('User Already Exists');
        }

     const passwordHash = await hash(password, 8);
        
      await  this.usersRepository.create({
            name,
            password: passwordHash,
            email,
        });
    }
}

export { CreateUserUseCase }