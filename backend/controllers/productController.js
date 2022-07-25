const Product = require('../model/productModel');
const ErrorHandler = require('../utils/errorHandle');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ApiFeatures = require('../utils/apiFeatures');
const { search } = require('../app');

//create products -- Admin only
exports.createProducts = catchAsyncErrors(async (req, res) => {
   //    console.log(req.body);
   const product = await Product.create(req.body);

   res.status(200).json({
      success: true,
      product,
   });
});

//get all products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
   let resultPerPage = 3;
   const productCounts = await Product.countDocuments();
   //sending apiFeature and collect products,
   const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);
   const product = await apiFeature.query;
   // const product = await Product.find();
   res.status(200).json({ success: true, product, productCounts });
});

//get single product details
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
   let product = await Product.findById(req.params.id);
   /* if(!product){
         return res.status(500).json({
             success:false,
             message:"product not found",
         })
     } */

   if (!product) {
      return next(new ErrorHandler('single product not found', 404));
   }
   res.status(200).json({
      success: true,
      message: 'single product details find',
      product,
   });
});

//Update Products,
exports.updateProducts = catchAsyncErrors(async (req, res, next) => {
   console.log(req.params.id);
   let product = await Product.findById(req.params.id);
   console.log(product);
   if (!product) {
      return res.status(500).json({
         success: false,
         message: 'product not found',
      });
   }

   product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
   });
   console.log(product);
   res.status(200).json({
      success: true,
      message: 'update successfully',
      product,
   });
});

//product delete -- Admin
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
   console.log(req.params.id);
   let product = await Product.findById(req.params.id);
   console.log(product);
   if (!product) {
      return res.status(500).json({
         success: false,
         message: 'product not found',
      });
   }

   await product.remove();
   res.status(200).json({
      success: true,
      message: 'product delete',
      product,
   });
});
