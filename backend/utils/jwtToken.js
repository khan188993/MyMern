const sendJWTToken = (user,statusCode,res,message)=>{
     //login user jwt generate
   const token = user.getJWTToken();

   //option for cookies 
   const options = {
    expires:new Date(
        Date.now + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly:true,
   }

   res.status(statusCode).cookie('token',token,options).json({
      success: true,
      message: message,
      token,
   });
}

module.exports = sendJWTToken;