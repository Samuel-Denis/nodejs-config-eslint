import { ProductController } from '@modules/product/useCase/products/create/productController';
import { ProductsListController } from '@modules/product/useCase/products/listar/productListController';
import { Router } from 'express'
import multer from 'multer';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAthenticare';
import  uploadConfig from '@config/upload';
import { UpdateImageProductController } from '@modules/product/useCase/products/updateImage/updateImageProductController';


const productsRouters = Router();


const uploadImage = multer(uploadConfig.upload('./tmp/product'));

const productsController = new ProductController();
const productsListController = new ProductsListController()
const updateImageProductController = new UpdateImageProductController()

productsRouters.post('/create', 
        // ensureAuthenticated, 
        // ensureAdmin,
        productsController.handler
        )

productsRouters.patch('/updateImage/:id', 
        // ensureAuthenticated, 
        // ensureAdmin,
        uploadImage.single('image'),
        updateImageProductController.handler
        )

productsRouters.get('/list', productsListController.handler)


export { productsRouters }