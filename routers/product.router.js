const router = require('express').Router();
const { createProduct } = require('../controllers/product.controller');

router.route('/products').post(createProduct);
router.route('/products').get(createProduct);


module.exports = router; 