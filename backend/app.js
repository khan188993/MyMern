const express = require('express');
const products = require('./routes/productRoute');
const orders = require('./routes/orderRoute')
const errorMiddleware = require('./middlewares/error')
const app = express();

app.use(express.json())


//api route using 
app.use(products);
app.use(orders);

// app.get('/',(req,res)=>{
//     res.send("hellow world")
// })
app.use(errorMiddleware);


module.exports = app;