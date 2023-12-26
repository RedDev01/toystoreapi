const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({

        id:{
            type: String,
            required: false
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
})

module.exports = mongoose.model('Products', productSchema);