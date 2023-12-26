const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({

    productID:{
        type: String,
        required: true
    },
    productName:{
        type: String,
        required: true
    },
    productImage:{
        type: String,
        required: false
    },
    price:{
        type: Number,
        required: true
    },
    qty:{
        type: Number,
        required: true
    },
    totalAmount:{
        type: Number,
        required: true
    },
    qtyDelivered:{
        type: Number,
        required: false
    }
})


const customerOrderSchema = new mongoose.Schema({

        id:{
            type: String,
            required: false
        },
        customerID:{
            type: String,
            required:false
        },
        customerName:{
            type: String,
            required:false
        },
        orderDateTime:{
            type: Date,
            default: Date.now
        },
        orders:[productSchema]
})

module.exports = mongoose.model('customerOrder', customerOrderSchema);