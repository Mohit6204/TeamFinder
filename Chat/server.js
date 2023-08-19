import express  from "express";
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import {Server}  from "socket.io";
import http from "http";
import Chat from "./Model/chat.js";
const port = process.env.PORT || 5000;
const app=express();
app.use(express.json());
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

// create new chat instance

app.post("/create/:id",async (req,res)=>{
     try {
       let {auth}=req.body;
       if(auth==process.env.CHAT_AUTH){
        const {id}=req.params;
        const newChat=new Chat({
           teamId:id,
           messages:[],
        });
        await newChat.save();
        res.status(200);
       }
       else{
         res.status(500);
       }
     } catch (error) {
        res.status(500);
     }
})

//delete a chat instance

app.post("/delete/:id",async (req,res)=>{
    try {
        let {auth}=req.body;
        if(auth==process.env.CHAT_AUTH){
            const {id}=req.params;
            const newChat = Chat.find({teamId:id});
            await Chat.deleteOne(newChat);
            res.status(200);
        }
        else{
            res.status(500)
        }
    } catch (error) {
        res.status(500);
    }
})

const io= new Server(server, {
    cors:{
        origin : 'http://localhost:3000'
    }
})
io.on('connection',(socket)=>{
    console.log("chat connected..")
    socket.on("message",(cnt)=>{
         io.emit("receive",cnt.message);

    })
})

server.listen(port,(error)=>{
    if(error)console.log(error);
    console.log("Chat server is running on port 5000");
})