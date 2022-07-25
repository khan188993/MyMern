const Users = require('../model/userModel');
const ErrorHandler = require('../utils/errorHandle');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

exports.getAllUser = async (req, res, next) => {
   const users = await Users.find();
   console.log('all user', users);
   res.send('all user get');
};

exports.createUser = catchAsyncErrors(async (req, res, next) => {
   console.log(req.body);
   const user = await Users.create(req.body);

   res.status(200).json({
      success: true,
      message: 'add new user',
      user,
   });
});
// /users/delete/62dea6a7dba87f12a0b41078
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
   const user = await Users.findById(req.params.id);


   if (!user) {
      return next(new ErrorHander(`User does not exist with Id: ${req.params.id}`, 400));
   }

   await user.remove();

   res.status(200).json({
      success: true,
      message: 'deleted user',
   });
});

/* [
      {
    
        "name": "arfan Khan",
        "password": "arfan12344@",
        "email": "arfan@gmail.com",
        "avatar": {
          "public_id": "public_id_3",
          "url": "url_3"
        }
      },
      {
    
        "name": "shuvo Khan",
        "password": "shuvo12344@",
        "email": "shuvo@gmail.com",
        "avatar": {
          "public_id": "public_id_3",
          "url": "url_3"
        }
      }
] */
