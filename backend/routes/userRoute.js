const express = require('express');
const router = express.Router();
const { getAllUser, registerUser, deleteUser, loginUser } = require('../controllers/userController');

router.route('/users').get(getAllUser).post(registerUser);
router.route('/user/delete/:id').delete(deleteUser);
router.route('/login').post(loginUser)

module.exports = router;


