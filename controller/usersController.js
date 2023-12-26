require('dotenv')

const Users = require('../models/Users')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');



//GET USERS
const displayUsers = asyncHandler(async (req, res) =>{
//  const {username, password} = req.body

//  const user = await Users.findOne({username})

//  if (!user) {
//    return res.status(401).json({ message: 'Username does not exist!' })
//  } else if (user.password !== password) {
//    return res.status(401).json({ message: 'Username and password did not match!' })
// }

//  const userPayload = {
//     username: user.username
//  }

//  const accessToken = jwt.sign(userPayload, process.env.ACCESS_TOKEN)

 //res.json({accessToken: accessToken})

//return res.status(200).json({message: `Welcome!  ${accessToken}`})

})

//CREATE USERS
const createNewUsers = asyncHandler(async (req, res) =>{
    const {username, password, lastName, firstName, middleName, emailAddress, isAdmin} = req.body 

    if (!username || !password || !lastName || !firstName || !middleName) {
        
        return res.status(400).json({message: 'all fields are required'})
    }

    const duplicateCount = await Users.countDocuments({ $or:[ 
        { username },
        { emailAddress},
        { $and: [{lastName, firstName, middleName}] }
        ] 
    })


    if(duplicateCount > 0 ){
        let message = "User with this username, customer name, and emailaddress already exists!"

        if(duplicateCount === 2){
            if(username && emailAddress) {
                message = "username and email address already in use!"
            } else if(username && lastName && firstName && middleName){
                message = "customer name with this username already exist!"
            } else if(emailAddress && lastName && firstName && middleName){
                message = "customer name with this email address already exist!"
            }
        }else if(duplicateCount === 1){
            if(username){
                message = "username already in used!"
            } else if(emailAddress){
                message = "email address already in used!"
            } else if( lastName && firstName && middleName){
                message = "customer name already in used"
            }
        }
        return res.status(409).json({ message })
    }

    let cryptPass = bcrypt.hashSync(req.body.password, 10)
   

    const userObject = {username, password: cryptPass, lastName, firstName, middleName, emailAddress, isAdmin}

    const user = await Users.create(userObject)

    if(user){
        return res.status(200).json({message: `Congratulations ${firstName} on creating you account!`})
    }else{
        return res.status(400).json({message: `Sorry ${firstName}, There seems to be a problem on adding new account!`})
    }
})

//UPDATE USERS


//------UserLogin---------------------
const loginUser = asyncHandler(async (req, res) =>{
      const {username, password} = req.body

      if(!username || !password){
        return res.status(401).json({message: "username and password is required"})
      }

      const user = await Users.findOne({username}).exec()


      if(!user){
        return res.status(401).json({message: `Invalid Username`})
      }


      const validPassword = bcrypt.compareSync(password, user.password)

      if(!validPassword){
        return res.status(401).json({message: `Incorrect Password!`})
      }

      const accessToken = jwt.sign({username: user.username, emailAddress: user.emailAddress}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1hr'})
      const refreshToken = jwt.sign({username: user.username}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '2hr'})
      
      return res.status(200).json({ message: `Welcome ${user.username}`, user, accessToken, refreshToken });
})


module.exports = {
    displayUsers,
    createNewUsers,
    loginUser,
}