import express from 'express';
import {createProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct} from '../controllers/productControllers.js';
const router = express.Router()

router.route('/product').post(createProduct).get(getAllProducts)
router.route('/product/:id').get(getSingleProduct).delete(deleteProduct).patch(updateProduct)

export default router;