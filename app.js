const express= require('express')
const { connectDatabase } = require('./database/database')
const User = require('./model/userModel')
const app=express()
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")


//teling node to use .env
require("dotenv").config()


app.use(express.json())
app.use(express.urlencoded({extended:true}))

//database connection
connectDatabase()


//test api to check if server live xa kinai 
app.get('/',(req,res)=>{
    res.status(200).json({
        message:"I am  so rich and successful and so hapyyyyy "
    })
   
})


//register user api
app.post('/register',async(req,res)=>{
    const{email,password,phoneNumber,username}=req.body
    if(!email || !password || !phoneNumber || !username){
        return res.status(400).json({
            message:"please provide emial password and phonenumber"
        })
    }

    //check emial user pailai exist xa ki xainw 
    const userFound = await User.find({userEmail: email})
    if(userFound.length > 0){
        return res.status(400).json({
            message:"user with this email has be already registered"
        })
    }
    
    //else
     await  User.create({
        userName: username,
        userPhoneNumber: phoneNumber,
        userEmail: email,
        userPassword:bcrypt.hashSync(password,12)   //max 12 hunxa salt ko value salt le password lai aftyaro banauni patta lagauna
    })

    res.status(201).json({      //201 status form created
        message :" user registeres successfully"
    })
})


//login use api
app.post("/login",async(req,res)=>{
    const{email,password}=req.body
    if(!email || !password){
        return res.status(400).json({
            message:"enter emial and password its required"
        })
    }
    
    //check if the email ko user xa ki xainw 
    const userFound= await User.find({userEmail:email})
    if(userFound.length == 0){
        return res.status(404).json({
            message:"user with this email not registered yet"
        })
    }

    //check for valid password
    const isMatched = bcrypt.compareSync(password,userFound[0].userPassword)
    if(isMatched){
    //generate token
    const token = jwt.sign({id:userFound[0]._id},process.env.SECRET_KEY,{
        expiresIn:'30d'
    })



     res.status(200).json({
            message:"user logged in successfully",
            token
        })
    }else{
        res.status(400).json({
            message:" opps! invalid password"
        })
    }

})





//.env bata port ko value layeko
const PORT= process.env.PORT
//listen server
app.listen(PORT,()=>{
    console.log(`server started at port ${PORT}`)
})
