const express = require('express');
const { getAllOrders } = require("../controllers/orderController");
const router = express.Router();

router.route('/orders').get(getAllOrders);

module.exports = router;