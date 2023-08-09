import React, { useState } from "react";
const Chat = () => {
  const [message, setMessage] = useState("");
  const handlechange = (event) => {
    const { value } = event.target;
    setMessage(value);
  };
  return (
    <div>
      <div className=" bg-white min-h-screen m-10 rounded-2xl overflow-auto flex flex-col">
        <div className=" bg-green-400 h-20 items-center flex">
          <h1 className=" text-white font-normal text-3xl flex px-10">Chat</h1>
        </div>
        <div className=" flex-1">

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
          <div className=" items-center flex px-4 cursor-pointer">
          <span className=" flex text-xl"><ion-icon name="send-sharp"></ion-icon></span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Chat;
