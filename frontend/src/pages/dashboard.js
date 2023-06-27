import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Dashboard() {
   const navigate=useNavigate();
   const check=useSelector((state)=>state.auth);
    const [myTeam,setMyTeam]=useState([]);
     const getTeams= async()=>{
          try {
               const res=await axios.get("http://localhost:8080/post/allTeams");
               setMyTeam(res.data);
          } catch (error) {
               console.log(error);
          }
       };
      const getLoginTeams=async ()=>{
         try {
            const res=await axios.get("http://localhost:8080/post/getTeams",{
               headers:{
                  "authorization":check.myToken,
               }
            });
            setMyTeam(res.data);
       } catch (error) {
            console.log(error);
       }
      }

     useEffect(()=>{
       if(check.isLogin){
         getLoginTeams();
       }
       else{
         getTeams();
       }
     },[]);

     const handleApply= async(id)=>{
        try {
           if(check.isLogin){
             navigate(`/applyTeam/${id}`)
           }
           else{
             navigate("/Login")
           }
        } catch (error) {
           console.log(error);
        }
     }
     return (
          <div className=" mx-auto py-36 px-8">
                <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
                    {myTeam.map((team)=>(
                         <div className="shadow-md rounded-lg bg-white m-6 hover:shadow-xl hover:m-5 duration-200 cursor-pointer" onClick={()=>handleApply(team._id)}>
                            <div className="py-2">
                               <h1 className=" flex justify-center text-xl font-semibold">{team.title}</h1>
                            </div>
                            <div className="px-4 pb-3">
                               <p>{team.description}</p>
                            </div>
                            <div className="px-4 pb-3">
                               <h1>Members Required - {team.remaining}</h1>
                            </div>
                            <div className="px-4 pb-3">
                               <h1>Team Admin - {team.adminName}</h1>
                            </div>
                         </div>

                    ))}
                </div>
          </div>
     );
}
export default Dashboard;