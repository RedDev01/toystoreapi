const Cart = require('../models/Cart')
const asyncHandler = require('express-async-handler')

//GET Cart content
const displayCart = asyncHandler(async (req, res) =>{
    const {customerID, customerName} = req.query

    const cart = await Cart.findOne({ customerID }).exec()

    if (!customerID || !customerName){
        return res.status(400).json({message: 'All fields are required'})
    }

    res.json(cart)
    
})

//Create Cart
const createCart = asyncHandler(async (req, res) =>{
     const {customerID, customerName, cartItems} = req.body

     const cart = await Cart.findOne({ customerID }).exec()
 
     if (!customerID || !customerName){
         return res.status(400).json({message: 'All fields are required'})
     }
 
     if(!cart){
         
         const cartObject = {customerID, customerName, cartItems}
         const response = await Cart.create(cartObject)
         res.json(response)
         res.status(201).json({ message: 'Cart created' });
     }
     else{
         res.json(cart)
     }
})

const updateCart = asyncHandler(async (req, res) =>{
    const {customerID, customerName, cartItems} = req.body

    const cart = await Cart.findOne({customerID});

    cart.cartItems = [...cart.cartItems, ...cartItems]
    const updatedCart = await cart.save()

    if (updatedCart) {
         const latestCartItem = cartItems[cartItems.length - 1];
         res.status(201).json({message: `Item ${latestCartItem.productName} added to Cart`})
    } else {
        res.status(400).json({message: 'Cart has not been updated'})
    }

})

const deleteItemOnCart = asyncHandler(async (req, res) =>{
    const {customerID, productID} = req.body

    if(!customerID){
        return res.status(400).json({ message: 'Customer not found, Item not removed!'})
    }


        const cart = await Cart.findOneAndUpdate({ customerID },{ $pull: { cartItems: { productID } } },{ new: true }).exec();
    
        if (!cart) {
          return res.status(400).json({ message: "Cart not found" });
        }
    
        return res.status(200).json({ message: "Item successfully removed!" });
      
})




module.exports = {displayCart, createCart, updateCart, deleteItemOnCart}


