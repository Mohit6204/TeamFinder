import axios from "axios";
import { useEffect, useState } from "react";
function Dashboard() {

    const [myTeam,setMyTeam]=useState([]);
     const getTeams= async()=>{
          try {
               const res=await axios.get("http://localhost:8080/post/allteams");
               setMyTeam(res.data);
          } catch (error) {
               console.log(error);
          }
       };

     useEffect(()=>{
       getTeams();
     },[]);
     return (
          <div className=" mx-auto py-36 px-8">
                <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
                    {myTeam.map((team)=>(
                         <div className="shadow-md rounded-lg bg-white m-6 hover:shadow-xl hover:m-5 duration-200">
                            <div className="py-2">
                               <h1 className=" flex justify-center text-xl font-semibold">{team.title}</h1>
                            </div>
                            <div className="px-4 pb-3">
                               <p>{team.description}</p>
                            </div>
                            <div className="px-4 pb-3">
                               <h1>Members Required - {team.intake}</h1>
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