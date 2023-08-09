import express  from "express";
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import {Server}  from "socket.io";
import http from "http";
const port = process.env.PORT || 5000;
const app=express();
const server=http.createServer(app);
dotenv.config();
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>{
    console.log("Connected to Database for chat")
})
.catch((error)=>{
    console.log("It's Error!")
    console.log(error)
})

const io= new Server(server, {
    cors:{
        origin : 'http://localhost:3000'
    }
})
io.on('connection',(socket)=>{
    console.log("Connected to Chat..")
})

server.listen(port,(error)=>{
    if(error)console.log(error);
    console.log("Chat server is running on port 5000");
})