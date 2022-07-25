const express = require('express');
const router = express.Router();
const { getAllUser, createUser, deleteUser } = require('../controllers/userController');

router.route('/users').get(getAllUser).post(createUser);
router.route('/user/delete/:id').delete(deleteUser);

module.exports = router;


