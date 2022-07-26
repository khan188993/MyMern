//route setup for product
const express = require('express');
const { getAllProducts,createProducts, updateProducts, deleteProduct, getSingleProduct } = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const router = express.Router();

router.route('/products').get(getAllProducts);
router.route('/products/new').post(isAuthenticatedUser,authorizeRoles('admin'),createProducts);
router.route('/products/:id').put(isAuthenticatedUser,authorizeRoles('admin'),updateProducts).delete(isAuthenticatedUser,authorizeRoles('admin'),deleteProduct).get(getSingleProduct)

module.exports = router;