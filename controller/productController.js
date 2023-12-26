const Product = require('../models/Products')
const asyncHandler = require('express-async-handler')


//GET Products
const displayProducts = asyncHandler(async (req, res) =>{
    const products = await Product.find().select().lean()
    
    if(!products){
        return res.status(400).json({message: 'No Products'})
    }
    res.json(products)
})

//INSERT Products
const createProducts = asyncHandler(async (req, res) =>{
    const {productName, productImage, price} = req.body

    //Confirm data
    if (!productName || !productImage || isNaN(price))
    {
        return res.status(400).json({message: 'All fields are required'})
    }

    //Check duplicate
    const duplicate = await Product.findOne({ productName }).lean().exec()

    if(duplicate){
        return res.status(409).json({message: 'Product already exist!'})
    }

    const productObject = {productName, productImage, price}
    //Create/Insert new Product
    const product = await Product.create(productObject)
    
    if(product) { //created
        res.status(201).json({message: `Product ${productName} successfully added`})
    } else {
        res.status(400).json({message: 'Product has not been added'})
    }
})

//Update Product
const updateProducts = asyncHandler(async (req, res) =>{

   const {id,  productName, productImage, price} = req.body

     //Confirm data
     if (!id || !productName || !productImage || isNaN(price))
     {
         return res.status(400).json({message: 'All fields are required'})
     
    }

    const product = await Product.findById(id).exec()

    if(!product) {
        return res.status(400).json({message:'Product not found!'})
    }

    //Check duplicate
    const duplicate = await Product.findOne({ productName }).lean().exec()

    if(duplicate && duplicate?._id.toString() !== id){
        return res.status(409).json({message: 'Product already exist!'})
    }

    product.productName = productName
    product.productImage = productImage
    product.price = price


    const updatedProduct = await product.save()

    res.status(200).json({message: `${updatedProduct.productName} updated!`})

})

//Delete Product
const deleteProducts = asyncHandler(async (req, res) =>{
    const {id} = req.body

    if(!id){
        return res.status(400).json({ message: 'Product ID Required!'})
    }

    const product = await Product.findById(id).exec()

    if(!product){
        return res.status(400).json({message: 'Product Not found'})
    }

    const result = await product.deleteOne()

    const reply = `Product ${result.productName} with ID ${result._id} has been deleted`
    res.status(200).json({message: reply})

})

module.exports = {
    displayProducts, createProducts, updateProducts, deleteProducts
}
