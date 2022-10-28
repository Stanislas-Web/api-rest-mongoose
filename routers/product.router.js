const router = require('express').Router();
const { createProduct, getAllProduct, updateProduct, deleteProduct} = require('../controllers/product.controller');

router.route('/products').post(createProduct);
router.route('/products').get(getAllProduct);
router.route('/product/:id').put(updateProduct);
router.route('/product/:id').delete(deleteProduct);


module.exports = router; 