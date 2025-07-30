const express = require("express")
const app = express()

require("dotenv").config();
const PORT  = process.env.PORT||8080



app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Hello")
})

app.listen(8080,()=>{
console.log("Server port number http://localhost:8080");
})