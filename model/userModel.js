const mongoose = require('mongoose')
const Schema=mongoose.Schema

const userSchema = new Schema({
    userEmail:{
        type:String,
        required: [true,'You must provide email']
    },
    userPhoneNumber:{
        type: Number,
        required:[true,"you must provide phone Number"]
    },
    userName:{
        type: String,
        required:[true,"you must provide your Name"]
    },
    userPassword:{
        type: String,
        required : [true , "password must be provided"]
    },
    role:{
        type: String,
        enum:["customer",'admin'],
        default:"customer"
    }
})

const User =mongoose.model('user',userSchema)
module.exports =User