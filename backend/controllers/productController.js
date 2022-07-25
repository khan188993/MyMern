const Product = require('../model/productModel');

//create products -- Admin only
exports.createProducts = async (req, res) => {
   //    console.log(req.body);
   const product = await Product.create(req.body);

   res.status(200).json({
      success: true,
      product,
   });
};

//get all products
exports.getAllProducts = async (req, res) => {
   const product = await Product.find();
   res.status(200).json({ success: true, product });
};

//Update Products,
exports.updateProducts = async (req,res,next)=>{
    console.log(req.params.id);
    let product = await Product.findById(req.params.id);
    if(!product){
        res.status(501).json({
            success:false,
            message:"product not found",
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    })
    console.log(product)
    res.status(200).json({
        success:true,
        message:'update successfully',
        product
    });
}
