const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    id:{
        type:String,
        required: false,
    },
    username:{
        type:String,
        required: true,
    },
    password:{
        type:String,
        required: true
    },
    lastName:{
        type:String,
        required: true
    },
    firstName:{
        type:String,
        required: true
    },
    middleName:{
        type:String,
        required: true
    },
    dateOfBirth:{
        type:Date,
        default: Date.now
    },
    emailAddress:{
        type:String,
        required: true
    },
    isAdmin:{
        type:Boolean,
        required: false,
        default: false
    }
})

module.exports = mongoose.model('Users', userSchema);