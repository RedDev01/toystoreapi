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
        required: true
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
    }
})


const cartSchema = new mongoose.Schema({

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
        cartItems:[productSchema]
})

module.exports = mongoose.model('Cart', cartSchema);