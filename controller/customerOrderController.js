const CustomerOrder = require('../models/CustomerOrders')
const Cart = require('../models/Cart')
const asyncHandler = require('express-async-handler')

//GET
const displayOrder = asyncHandler(async(req, res) =>{
    const {customerID, customerName} = req.query

    const cart = await CustomerOrder.findOne({ customerID }).exec()

    if (!customerID || !customerName){
        return res.status(400).json({message:`customerID and customerName is required`})
    }

    res.json(cart)
})


//Insert or Place Order
const placeOrder = asyncHandler(async(req, res)  =>{
    const {customerID, customerName, orderDateTime, orders} = req.body

    if(!customerID || !customerName || !orderDateTime || !orders){
        return res.status(400).json({message: `All fields are required`})
    }


     if(!Array.isArray(orders)){
        return res.status(400).json({ message: 'Orders should be on Array' });
     }

    
     try {

        const cart = await Cart.findOne({customerID})

        if (!cart) {
            return res.status(400).json({message:"Nothing on the cart!"})
            
        }

        const cartItems = cart.cartItems;

        const updatedOrders = orders.map(order =>{
            const productID = order.productID

            const cartItem = cartItems.find(item => item.productID === productID)

            if(!cartItem){
                throw new Error(`Product ${productID} not found in cart`);
            }

            return {...order, 
                productName: cartItem.productName,
                price: cartItem.price,
                qty: cartItem.qty,
                totalAmount: cartItem.totalAmount}
        })

        const orderObject = {customerID, customerName, orderDateTime, orders: updatedOrders}

        const saveOrder = await CustomerOrder.create(orderObject)
        
        if(saveOrder){
    
            const orderProductIDs = orders.map(order=> order.productID)
    
            const cartItemIdsToRemove = cart.cartItems.filter(item => orderProductIDs.includes(item.productID))
                                                       .map(item => item._id);
    
             const deleteFilter = { $and: [{ customerID }] };
             if (cartItemIdsToRemove && Array.isArray(cartItemIdsToRemove)) {
                deleteFilter.$and.push({ 'cartItems.productID': { $in: orderProductIDs } });
    
               
             }
            const result = await Cart.updateOne(deleteFilter, { $pull: { cartItems: { _id: { $in: cartItemIdsToRemove } } } });
            
             if(result){
                return res.status(200).json({message: `Order placed successfully!`})
             }
             return res.status(400).json({message: `Placing Order has failed!`})
            
        }
        else{
            return res.status(400).json({message:`Order not saved!`})
        }
        
     } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
     }

   
})


const deleteOrder = asyncHandler(async(req, res) =>{
    const {customerID} = req.body

    if(!customerID){
        return res.status(400).json({ message: 'Customer ID Required!'})
    }

    const orderCart = await CustomerOrder.findOne({customerID}).exec()

    if(!orderCart){
        return res.status(400).json({ message: 'Nothing to delete, customer has no pending order!'})
    }

    const result = await orderCart.deleteOne()

    const reply = `Order ${result.customerID} with ID  has been deleted`
    res.status(200).json({message: reply})   

})

module.exports = {displayOrder, placeOrder, deleteOrder}