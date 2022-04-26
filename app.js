const express = require('express')
const mongoose = require('mongoose')
const dotenv = require("dotenv");

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended:true}));

mongoose.connect('mongodb://localhost:27017/product_order_api').then(()=> {
    console.log('Mongodb is connected')
})

const ProductRoute = require('./routes/product.route')
const AuthRoute = require('./routes/auth.route')
const UserRoute = require('./routes/user.route')
const VoucherRoute = require('./routes/voucher.route')


app.use('/api/products', ProductRoute);
app.use('/api/auth', AuthRoute);
app.use('/api/user', UserRoute);
app.use('/api/vouchers', VoucherRoute);

app.use((req,res,next)=>{
    const err = new Error("Not Found")
    err.status = 404;
    next(err)
})

// handler error express
app.use((err, req, res, next)=>{
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})

app.listen(3000, () => {
    console.log('Server running in 3000')
})