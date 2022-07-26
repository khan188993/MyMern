//route setup for product
const express = require('express');
const { getAllProducts,createProducts, updateProducts, deleteProduct, getSingleProduct } = require('../controllers/productController');
const { isAuthenticatedUser } = require('../middlewares/auth');
const router = express.Router();

router.route('/products').get(isAuthenticatedUser,getAllProducts);
router.route('/products/new').post(createProducts);
router.route('/products/:id').put(updateProducts).delete(deleteProduct).get(getSingleProduct)

module.exports = router;