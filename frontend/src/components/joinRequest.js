import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Join() {
    
     const navigate=useNavigate();
     const check=useSelector((state)=>state.auth);
     const [myTeam,setMyTeam]=useState([]);

     const getjoin=async ()=>{
          try {
             const res=await axios.get("http://localhost:8080/request/join",{
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
        getjoin();
        },[])
     return (
          <h1>Join Requests</h1>
     );
}
export default Join;