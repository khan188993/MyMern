const express = require('express');
const router = express.Router();
const { getAllUser, registerUser, deleteUser, loginUser, logoutUser } = require('../controllers/userController');

router.route('/users').get(getAllUser).post(registerUser);
router.route('/user/delete/:id').delete(deleteUser);
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)

module.exports = router;


