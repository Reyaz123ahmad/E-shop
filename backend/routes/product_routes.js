const express = require('express')

const { createProduct, getProduct, getProductById, updateProduct, deleteProduct } = require('../controller/product_controller')
const { auth, isAdmin, isCustomer } = require('../middleware/auth')

const router = express.Router()

router.post('/', auth, isAdmin, createProduct);
router.get('/', getProduct);

router.get('/:productId', getProductById)
router.put('/update/:productId', auth, isAdmin, updateProduct)
router.delete('/delete/:productId', auth, isAdmin, deleteProduct)



module.exports = router;


