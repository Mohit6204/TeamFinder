import express  from "express";
import { Socket } from "socket.io";
import http from "http";
const port = 5000;
const app=express();
const server=http.createServer(app);
const io=Socket(server,{
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
