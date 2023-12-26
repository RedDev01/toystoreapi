const Settings = require('../models/Settings')
const asyncHandler = require('express-async-handler')


//GET
const displaySettings = asyncHandler(async (req, res) =>{
    const settings = await Settings.find().select().lean()


    if(!settings){
        return res.status(400).json({message: 'No Settings yet'})
    }
    res.json(settings)
})

const createSettings = asyncHandler(async (req, res) =>{
    const {settingsName, settingsContent, settingsType} = req.body

    //Confirm data
    if(!settingsName || !settingsType){
        return res.status(400).json({message: 'All fields are required'})
    }

    //Check duplicate
    const duplicate = await Settings.findOne({ settingsName }).lean().exec()

    if(duplicate){
        return res.status(409).json({message: 'Setting Already Exist'})
    }

    const settingsObject = {settingsName, settingsContent, settingsType}

    const settings = await Settings.create(settingsObject)
    
    if(settings) { //created
        res.status(201).json({message: `Settings ${settingsType} successfully added`})
    } else {
        res.status(400).json({message: 'Settings has not been added'})
    }
    
})


const updateSettings = asyncHandler(async (req, res) =>{
})


const deleteSettings = asyncHandler(async (req, res) =>{
    const {id} = req.body

    if(!id){
        return res.status(400).json({ message: 'Settings ID Required!'})
    }

    const settings = await Settings.findById(id).exec()

    if(!settings){
        return res.status(400).json({message: 'Settings Not found'})
    }

    const result = await settings.deleteOne()

    const reply = `Settings ${result.settingsName} has been deleted`
    res.status(200).json({message: reply})

})


module.exports = {displaySettings, createSettings, updateSettings, deleteSettings}