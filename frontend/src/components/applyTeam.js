import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ApplyTeam = () => {
    const myState = useSelector((state) => state.main.apply);
    const check=useSelector((state)=> state.auth);
    const navigate=useNavigate();
    const [text,setText]=useState("");
    const handleChange=(event)=>{
        const {value } = event.target;
        setText(value);
    }
    const handleApply= async(message)=>{
       try {
          const id=myState._id;
          const res=await axios.post("http://localhost:8080/request/apply",{message,id},{
            headers:{
                 "authorization":check.myToken,
            }
         });
          navigate("/Pending");
       } catch (error) {
        console.log(error);
       }
    }
   
    return (
        <>
            <div className="shadow-md rounded-lg bg-white m-6 flex flex-row">
                <div className="flex flex-col w-1/2 border-r-2">
                    <div className="py-2">
                        <h1 className=" flex justify-center text-xl font-semibold">{myState.title}</h1>
                    </div>
                    <div className="px-4 pb-3">
                        <h1>Members Required - {myState.remaining}</h1>
                    </div>
                    <div className="px-4">
                        <h1>Team Admin - {myState.adminName}</h1>
                    </div>
                    <div className=" px-4 w-full">
                        <textarea style={{resize: 'none'}} rows={5} placeholder="Say something to the admin" name="text" value={text} className=" px-2 border-2 rounded-lg w-full" onChange={handleChange}/>
                    </div>
                    <div className="pb-4 flex justify-center">
                        <h1 className="p-2 border-2 rounded-full text-center cursor-pointer bg-black text-white hover:bg-black/80 duration-100 w-1/6" onClick={()=>handleApply(text)}>Apply</h1>
                    </div>
                </div>
                <div className="flex flex-col w-1/2">
                    <div className="px-4 pb-3 flex justify-center">
                        <h1 className="text-xl font-semibold">About Team</h1>
                    </div>
                    <div className="px-4 pb-3">
                        <p>{myState.description}</p>
                    </div>
                    <div className="px-4 pb-3">
                        <h1>Total Team Strength - {myState.intake+1}</h1>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ApplyTeam;