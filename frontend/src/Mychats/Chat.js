import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import socketIO from "socket.io-client";
const Chat = () => {
  const [message, setMessage] = useState("");
  const [allmessage, setAllMessages] = useState([]);
  const User=useSelector((state)=>state.auth.myUser);
  const {id}=useParams();
    const socketRef = useRef(null);
  useEffect(()=>{

    const socket= socketIO('http://localhost:5000');
    socket.on("receive",newMessage=>{
      console.log(newMessage);
      setAllMessages(()=>[...allmessage, newMessage]);
    })
    socket.emit("join-room",id);
    socketRef.current = socket;
    return ()=>{
      socket.disconnect(); 
    console.log("disconnected")

  }
},[])
const socket = socketRef.current;
const handlechange = (event) => {
  const { value } = event.target;
  setMessage(value);
};
  const handleMessage=async()=>{
      try {
         const my_message={
          userName:User.firstName,
          content:message,
          userId:User._id,
         }
         socket.emit("message",my_message,id);
         setMessage("");
      } catch (error) {
         console.log(error);
      }
  }
  return (
    <div>
      <div className=" bg-white min-h-screen m-10 rounded-2xl overflow-auto flex flex-col">
        <div className=" bg-purple-700 h-20 items-center flex">
          <h1 className=" text-white font-normal text-3xl flex px-10">Chat</h1>
        </div>
        <div className=" flex-1">
           {/* {val.length&&val.map((member)=>(
               <div className={` p-2 my-2 flex ${member.name==="Mohit" ? " flex-row-reverse" : " flex-row"}`}>
                <div className="px-2">
                <div className={` flex pb-2 ${member.name==="Mohit" ? " justify-end" : " justify-start"}`}>
                   {member.name}
                </div>
                 <div className={`border-2 p-4 h-fit w-fit roun ${member.name==="Mohit" ? " rounded-s-2xl bg-slate-800 text-white" : " rounded-e-2xl  bg-slate-500 text-white"} rounded-b-2xl max-w-2xl break-words`}>
                   {member.sum}
                 </div>
                </div>
               </div>
           ))} */}
        </div>
        <div className=" flex h-14 border-2 rounded-xl p-2 m-2">
        <input
            className="px-2 overflow-auto w-full"
            type="text"
            id="message"
            name="message"
            value={message}
            placeholder="Message...."
            onChange={handlechange}
          />
          <div className=" items-center flex px-4 cursor-pointer" onClick={()=>handleMessage()}>
          <span className=" flex text-xl"><ion-icon name="send-sharp"></ion-icon></span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Chat;
