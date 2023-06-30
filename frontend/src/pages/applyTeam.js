import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Load from "../components/loading";

const ApplyTeam = () => {
    const {id}=useParams();
    const check=useSelector((state)=> state.auth);
    const navigate=useNavigate();
    const [text,setText]=useState("");
    const [team,setTeam]=useState({});
    const [loading,setLoading]=useState(true);
    const handleChange=(event)=>{
        const {value } = event.target;
        setText(value);
    }
    const handleApply= async(message)=>{
       try {
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
    const getTeam=async()=>{
       try {
        const res=await axios.get(`http://localhost:8080/request/getTeam/${id}`,{
            headers:{
                 "authorization":check.myToken,
            }
         });
         setTeam(res.data);
         setLoading(false);
       } catch (error) {
         console.log(error);
         setLoading(false);
       }
    }
    useEffect(()=>{
        console.log(id);
       getTeam();
    },[])
   
    return (
      loading ? <>
           <div className="flex justify-center w-full h-full my-40 ">
     <Load />
    </div>
      </> :  <>
            <div className="shadow-md rounded-lg bg-white m-6 flex flex-row">
                <div className="flex flex-col w-1/2 border-r-2">
                    <div className="py-2">
                        <h1 className=" flex justify-center text-xl font-semibold">{team.title}</h1>
                    </div>
                    <div className="px-4 pb-3">
                        <h1>Members Required - {team.remaining}</h1>
                    </div>
                    <div className="px-4">
                        <h1>Team Admin - {team.name}</h1>
                    </div>
                   {
                    team.isPending ? <><div className="pt-4 px-4">
                       <div className="py-2">
                          <h1 className=" hover:border-blue-700 rounded-lg text-center w-52 border-2 hover:text-blue-700 cursor-pointer" onClick={()=>navigate("/Pending")}>Your Request is Pending !!</h1>
                       </div>
                       <div className="py-2">
                          <h1>Your Messgae - {team.message}</h1>
                       </div>
                    </div>
                    </> : <>  <div className=" px-4 w-full">
                        <textarea style={{resize: 'none'}} rows={5} placeholder="Say something to the admin" name="text" value={text} className=" px-2 border-2 rounded-lg w-full" onChange={handleChange}/>
                    </div>
                    <div className="pb-4 flex justify-center">
                        <h1 className="p-2 border-2 rounded-full text-center cursor-pointer bg-black text-white hover:bg-black/80 duration-100 w-1/6" onClick={()=>handleApply(text)}>Apply</h1>
                    </div>
                    </>
                   }
                </div>
                <div className="flex flex-col w-1/2">
                    <div className="px-4 pb-3 flex justify-center">
                        <h1 className="text-xl font-semibold">About Team</h1>
                    </div>
                    <div className="px-4 pb-3">
                        <p>{team.description}</p>
                    </div>
                    <div className="px-4 pb-3">
                        <h1>Total Team Strength - {team.intake+1}</h1>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ApplyTeam;