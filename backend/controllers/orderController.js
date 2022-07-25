exports.getAllOrders = async (req,res)=>{
    console.log('get all order')
    res.status(200).json({
        success:true,
        order:"all order getting",
    })
}