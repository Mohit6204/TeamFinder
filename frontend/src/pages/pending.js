import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Pending() {
    
     const navigate=useNavigate();
     const check=useSelector((state)=>state.auth);
     const [myTeam,setMyTeam]=useState([]);

     const getpending=async ()=>{
          try {
             const res=await axios.get("http://localhost:8080/request/pending",{
                headers:{
                   "authorization":check.myToken,
                }
             });
             console.log(res.data);
             setMyTeam(res.data);
        } catch (error) {
             console.log(error);
        }
       }
       useEffect(()=>{
          getpending();
        },[])
     return (
          <h1>Pending Requests</h1>
     );
}
export default Pending;