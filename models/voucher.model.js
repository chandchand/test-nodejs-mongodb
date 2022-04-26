const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VoucherSchema = new Schema({
    userId: {
        type: String, 
        required:true
    },
    code: {
        type:String,
        require:true,
        unique: true
    },
    discount:{
        type: Number
    },
    amount:{
        type:Number,
        required: true
    },
    expiredDate:{
        type: String, 
        require: true, 
        default: ""
    },
    isActive: { 
        type: Boolean, 
        require: true, 
        default: true }
},
    {
        timestamps:true
    }
);
VoucherSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) {
    this.created_at = currentDate;
    }
    next();
    });
    var Vouchers = mongoose.model('DiscountCodes', VoucherSchema);
    module.exports = Discounts;
