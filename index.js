const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express()

require("dotenv").config();
const PORT  = process.env.PORT||8080
const url = process.env.MongoDB_URL

function connectMongoDB(){
    try{

    mongoose.connect(url);
    console.log(" connected to mongoDB");
    }catch(err){
        console.log("Error to connect mongoDB");
    }
   
}



app.get("/",(req,res)=>{
    res.send("Hello")
})

app.listen(8080,()=>{
    connectMongoDB()
console.log("Server port number http://localhost:8080");
})