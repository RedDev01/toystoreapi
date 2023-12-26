const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
    id:{
        type: String,
        required: false
    },
    name:{
        type: String,
        required: false
    },
    image:{
        type: String,
        required: false
    }

})

const settingsSchema = new mongoose.Schema({

    id:{
        type: String,
        required: false
    },
    settingsName:{
        type: String,
        required: false
    },
    settingsContent: [imageSchema],
    settingsType:{
        type: String,
        required: false
    }

})

module.exports = mongoose.model("Settings", settingsSchema);