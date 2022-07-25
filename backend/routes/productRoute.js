//route setup for product
const express = require('express');
const { getAllProducts,createProducts, updateProducts } = require('../controllers/productController');
const router = express.Router();

router.route('/products').get(getAllProducts);
router.route('/products/new').post(createProducts);
router.route('/products/:id').put(updateProducts)

module.exports = router;