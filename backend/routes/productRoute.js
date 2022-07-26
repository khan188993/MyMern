//route setup for product
const express = require('express');
const { getAllProducts,createProducts, updateProducts, deleteProduct, getSingleProduct } = require('../controllers/productController');
const { isAuthenticatedUser } = require('../middlewares/auth');
const router = express.Router();

router.route('/products').get(getAllProducts);
router.route('/products/new').post(isAuthenticatedUser,createProducts);
router.route('/products/:id').put(isAuthenticatedUser,updateProducts).delete(isAuthenticatedUser,deleteProduct).get(getSingleProduct)

module.exports = router;