const sendJWTToken = (user,statusCode,res,message)=>{
     //login user jwt generate
   const token = user.getJWTToken();


   res.status(statusCode).json({
      success: true,
      message: message,
      token,
   });
}

module.exports = sendJWTToken;