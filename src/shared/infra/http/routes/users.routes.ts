import { Router } from "express";
import { CreateUserController } from "@modules/user/useCases/Create/createUserController";
import { UpdateUserAvatarController } from "@modules/user/useCases/updateAvatar/updateUserAvatarController";

import uploadConfig from '@config/upload';
import multer from "multer";
import { ensureAuthenticated } from "../middlewares/ensureAthenticare";
const usersRoutes = Router();

const userControler = new CreateUserController()
const updateAvatar = new UpdateUserAvatarController();

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'));


usersRoutes.post('', userControler.handler)

usersRoutes.post('/avatar', 
uploadAvatar.single('avatar'),
ensureAuthenticated,
updateAvatar.handle
 )

export { usersRoutes };
