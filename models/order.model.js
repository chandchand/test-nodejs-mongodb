const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    userId: {
        type: String, 
        required:true
    },
    products: [
        {
            productId:{
                type: String
            },
            qty:{
                type: Number,
                default: 1
            }
        }
    ],
    voucherId:{
        type: String,
    },
    datetime:{
        type: Date, 
        default: Date.now
    },
    price:{
        type: Number
    },
    discount:{
        type: Number,
    },
    discountPrice:{
        type: Number,
    },
    totalPrice:{
        type: Number,
    }
},
    {
        timestamps:true
    }
);

const Order = mongoose.model('orders', OrderSchema)
module.exports = Product;