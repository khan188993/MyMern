const express = require('express');
const app = express();

app.use(express.json())
const products = require('./routes/productRoute');

app.use(products);

// app.get('/',(req,res)=>{
//     res.send("hellow world")
// })

module.exports = app;