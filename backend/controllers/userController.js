const Users = require('../model/userModel');
const ErrorHandler = require('../utils/errorHandle');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendJWTToken = require('../utils/jwtToken')

exports.getAllUser = async (req, res, next) => {
   const users = await Users.find();
   console.log('all user', users);
   res.send('all user get');
};

//Register new user with jwt token
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
   console.log(req.body);
   const user = await Users.create(req.body);
   const token = user.getJWTToken();

   //external file send token,
   sendJWTToken(user,200,res,'register new user');
});

//Login User With jwt Token
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
   const { email, password } = req.body;

   // checking if user has given password and email both

   if (!email || !password) {
      return next(new ErrorHandler('Please Enter Email & Password', 400));
   }

   const user = await Users.findOne({ email }).select('+password');

   if (!user) {
      return next(new ErrorHandler('Invalid email or password', 401));
   }

   const isPasswordMatched = await user.comparePassword(password);

   if (!isPasswordMatched) {
      return next(new ErrorHandler('Invalid email or password', 401));
   }

   /* //login user jwt generate
   const token = user.getJWTToken();
   res.status(200).json({
      success: true,
      message: 'login user',
      user,
      token,
   }); */

   sendJWTToken(user,200,res,'login user send');

});

// /users/delete/62dea6a7dba87f12a0b41078
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
   const user = await Users.findById(req.params.id);

   if (!user) {
      return next(new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400));
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
