const express = require("express")
const app = express()
require("dotenv").config()
const mongoose = require("mongoose")
const userRoutes =require("./routes/userRoutes")

const url= process.env.MongoDB_URL
const port= process.env.PORT || 8080

app.use(express.json())

function connectToMDB(){
    try{
        mongoose.connect(url);
        console.log("Connected to DB");
        
    }catch(err){
        console.log("Error in connecting mongo db",err.message);
        
    }
}

app.use("/api/v1/users",userRoutes)

app.listen(port,()=>{
    connectToMDB()
    console.log(`Server is running on ${port} port`);   
})
