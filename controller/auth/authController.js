const User = require("../../model/userModel")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

exports.registerUser = async(req,res)=>{
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
}

exports.loginUser = async(req,res)=>{
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

}