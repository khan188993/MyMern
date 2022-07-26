const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
/* 
userName,userEmail.userPassword,avaterImg,
*/
const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, 'Please Enter Your Name'],
      maxLength: [30, 'Name cannot exceed 30 characters'],
      minLength: [4, 'Name should have more than 4 characters'],
   },
   email: {
      type: String,
      required: [true, 'Please Enter Your Email'],
      unique: true,
      validate: [validator.isEmail, 'Please Enter a valid Email'],
   },
   password: {
      type: String,
      required: [true, 'Please Enter Your Password'],
      minLength: [8, 'Password should be greater than 8 characters'],
      select: false,
   },
   avatar: {
      public_id: {
         type: String,
         required: true,
      },
      url: {
         type: String,
         required: true,
      },
   },
   role: {
      type: String,
      default: 'user',
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
   resetPasswordToken: String,
   resetPasswordExpire: Date,
});

//password hashing
userSchema.pre('save', async function (next) {
   if (!this.isModified('password')) {
      next();
   }

   this.password = await bcrypt.hash(this.password, 10);
});

//jwt token creating
userSchema.methods.getJWTToken = function () {
   return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
   });
};

// Compare Password

userSchema.methods.comparePassword = async function (password) {
   return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);

// schema model datatype: [type:(number,boolen,string)/ default,require:[true,'message'],unique,select:true:minLength,maxLength:[10,'message']/ select:false,,this.validate:[validator.isEmail]]
