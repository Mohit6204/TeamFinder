import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Accepted() {
    
     const navigate=useNavigate();
     const check=useSelector((state)=>state.auth);
     const [myTeam,setMyTeam]=useState([]);

     const getAccepted=async ()=>{
          try {
             const res=await axios.get("http://localhost:8080/request/accepted",{
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
          getAccepted();
        },[])
     return (
          <h1>Accepted Requests</h1>
     );
}
export default Accepted;