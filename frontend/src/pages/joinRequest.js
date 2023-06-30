import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Load from "../components/loading";

function Join() {
    
     const navigate=useNavigate();
     const check=useSelector((state)=>state.auth);
     const [myTeam,setMyTeam]=useState([]);
     const [loading,setLoading]=useState(true);

     const getjoin=async ()=>{
          try {
             const res=await axios.get("http://localhost:8080/request/join",{
                headers:{
                   "authorization":check.myToken,
                }
             });
             
             setMyTeam(res.data);
             setLoading(false);
        } catch (error) {
             console.log(error);
              setLoading(false);            
        }
       }
       useEffect(()=>{
        getjoin();
        },[])

        const handleConfirm = async(team_id,user_id,isConfirmed)=>{
          try {
               const value={team_id,user_id,isConfirmed};
               const res=await axios.post("http://localhost:8080/request/confirmation",value,{
                  headers:{
                     "authorization":check.myToken,
                  }
               });
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
           </> :           <>
          <div className=" flex my-4 flex-col mt-10 ">
           {myTeam.map((team)=>(
               <div className="flex bg-white my-2 mx-4 rounded-lg px-4 py-2 flex-row justify-between shadow-md">
                  <div>
                    <h1>Title - {team.title}</h1>
                    <h2>Team Size - {team.size}</h2>
                    <h3>Skills Required - {team.skillRequired}</h3>
                    <h3>Message from the User - {team.message}</h3>
                    <h1 className="text-xl justify-center">Requested By </h1>
                    <div className="py-2 text-center border-2 rounded-lg">
                         <h1>Name - {team.name}</h1>
                         <h2>Contact Number - {team.contactNumber}</h2>
                         <h2>Email - {team.email}</h2>
                         <h3>Skills - {team.skill}</h3>
                    </div>
                  </div>
                   <div className=" flex flex-col justify-between py-2">
                     <div className=" flex pt-2">
                     <h1 className=" border-2 rounded-xl px-2 py-1 font-sans font-semibold hover:bg-green-700 hover:text-white cursor-pointer transition-all text-center " onClick={()=>handleConfirm(team.team_id,team.user_id,true)}>Accept <span className=" text-xl"><ion-icon name="checkmark"></ion-icon></span></h1>
                     </div>
                     <div className=" flex pb-2">
                     <h1 className=" border-2 rounded-xl px-2 py-1 font-sans font-semibold hover:bg-red-700 hover:text-white cursor-pointer transition-all " onClick={()=>handleConfirm(team.team_id,team.user_id,false)}>Cancel <span className=" text-xl"><ion-icon name="close-circle"></ion-icon></span></h1>
                     </div>
                   </div>
               </div>
           ))}
          </div>
          </>
     );
}
export default Join;