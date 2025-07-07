const express= require('express')
const { connectDatabase } = require('./database/database')
const app=express()
// const { registerUser, loginUser } = require('./controller/auth/authController')

//routes
const authRoute= require("./routers/authRoute")

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
// app.post('/register',registerUser)  //authroute ma vaxa yo sabai ra app.use("",authRoute garxem sabai route esmai aauxa)
//login use api
// app.post("/login",loginUser) //refactor code vanam eslai MVCR pattern use gareko Model View Controller Route

app.use("",authRoute)



//.env bata port ko value layeko
const PORT= process.env.PORT
//listen server
app.listen(PORT,()=>{
    console.log(`server started at port ${PORT}`)
})
