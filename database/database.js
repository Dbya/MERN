const mongoose = require("mongoose")

exports.connectDatabase= async()=>{
    //connecting database
    //await till database connect

    await mongoose.connect(process.env.MONGO_URL) //@ ko encoded %40 esto hunxa password ma diresct @rakhda kaam gardai so %40 rakhni
    console.log("i m mow connected be sure")
}