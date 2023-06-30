import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Load from "../components/loading";

function Pending() {
    
     const navigate=useNavigate();
     const check=useSelector((state)=>state.auth);
     const [myTeam,setMyTeam]=useState([]);
     const [loading,setLoading]=useState(true);

     const getpending=async ()=>{
          try {
             const res=await axios.get("http://localhost:8080/request/pending",{
                headers:{
                   "authorization":check.myToken,
                }
             });
             setLoading(false);
             console.log(res.data);
             setMyTeam(res.data);
        } catch (error) {
             console.log(error);
             setLoading(false);
        }
       }
       useEffect(()=>{
          getpending();
        },[]);
        const handleCancel= async (id)=>{
             try {
               const res=await axios.get(`http://localhost:8080/request/cancelRequest/${id}`,{
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
     return (
          loading ? <>
          <div className="flex justify-center w-full h-full my-40 ">
     <Load />
    </div>
          </> : 
           myTeam.length ? <>
          <div className=" flex my-4 flex-col mt-10 ">
           {myTeam.map((team)=>(
               <div className="flex bg-white my-2 mx-4 rounded-lg px-4 py-2 flex-row justify-between shadow-md">
                  <div>
                    <h1>Title - {team.title}</h1>
                    <h2>Team Size - {team.size}</h2>
                    <h3>My message - {team.message}</h3>
                    <h2>Admin Name - {team.adminName}</h2>
                  </div>
                   <div className=" flex flex-col justify-between">
                     <div className=" flex">
                     <h1 className=" border-2 rounded-xl px-2 py-1 font-sans font-semibold hover:bg-red-700 hover:text-white cursor-pointer transition-all " onClick={()=>handleCancel(team.id)}>Cancel Request <span className=" text-xl"><ion-icon name="close-circle"></ion-icon></span></h1>
                     </div>
                     <div className=" flex">
                     <h1 className=" border-2 rounded-xl px-2 py-1 font-sans font-semibold hover:bg-blue-700 hover:text-white cursor-pointer transition-all text-center " onClick={()=>navigate(`/applyTeam/${team.id}`)}>View Team <span className=" text-xl"><ion-icon name="eye"></ion-icon></span></h1>
                     </div>
                   </div>
               </div>
           ))}
          </div>
          </> : <>
          <div className=" flex justify-center p-4 h-screen items-center flex-col">
               <h1 className=" text-xl font-medium">Sorry, you have not applied for any team.</h1>
               <div className="py-2 hover:text-blue-600 cursor-pointer" onClick={()=>navigate("/dashboard")}>Apply now</div>
          </div>
          </>

     );
}
export default Pending;