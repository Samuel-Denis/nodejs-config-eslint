import { CreateCategoryController } from "@modules/product/useCase/category/create/createCategoryController";
import { Router } from "express";
import multer from "multer";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAthenticare";
import   uploadConfig from '@config/upload'

const categoriesRoutes = Router();

const uploadImage = multer(uploadConfig.upload('./tmp/category'));

const createCategory = new CreateCategoryController()
categoriesRoutes.post('/',
    ensureAuthenticated,
    ensureAdmin,
    uploadImage.single('image'),
    createCategory.handler
    )

    
export { categoriesRoutes };
