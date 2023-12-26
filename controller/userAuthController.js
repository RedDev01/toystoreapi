require('dotenv')

const Users = require('../models/Users')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const { findOne } = require('../models/Users')


//------Get User base on the JWT token------
const getUserInfo = asyncHandler (async(req, res) =>{

    const user ={
        username: req.user.username,
        emailaddress: req.user.emailAddress
    }
 
    const userinfo = await Users.findOne({username: user.username, emailAddress: user.emailaddress}).exec()

    if(!userinfo){
        return res.status(401).json({message: `username: ${user.username} not found!`})
    }
    
    const fullname = `${userinfo.lastName}, ${userinfo.firstName} ${userinfo.middleName.charAt(0)}.`
    return res.status(200).json({message: `Welcome back ${fullname}!`, body: fullname}) 
})
//------------------------------------



module.exports = {
    getUserInfo,
}