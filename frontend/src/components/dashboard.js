import axios from "axios";
import TeamShow from "./teamShow";
import { useEffect, useState } from "react";
function Dashboard() {

     const [teams,setTeams]=useState([]);
     const getTeams= async()=>{
          try {
              const res= await axios.get('http://localhost:3004/card');
               setTeams(res.data.reverse());
          } catch (error) {
               console.log(error);
          }
       };

     useEffect(()=>{
       getTeams();
     },[]);
     return (
          <div className="team-list">
               {teams.map((team) => {
                    return <TeamShow key={team.id} team={team} getTeams={getTeams}/>
               })}
          </div>
     );
}
export default Dashboard;