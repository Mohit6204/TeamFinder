import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function TeamShow({ team ,getTeams}) {
     const navigate=useNavigate();

    const deleteTeam = async (id)=>{
       try {
          await axios.delete(`http://localhost:3004/card/${id}`);
          getTeams();
          console.log('clicked');
          navigate('/dashboard');
          
       } catch (error) {
          console.log(error);
       }
    };

     return (
          <div className="team-show">
               <div className="card" p-3>
                    <div className="card-content">
                         <div class="media-content">
                              <p class="title is-4">{team.value.title}</p>
                              <p class="subtitle is-6">Members Required {team.value.number}</p>
                         </div>
                         <div class="content">
                              {team.value.description}
                         </div>
                         <span>
                              <a href="https://twitter.com/codinghorror/status/506010907021828096"><h3>Apply</h3></a>
                         </span>
                         <div className="actions">
                              <Link to={`/edit/${team.id}`} className="edit">Edit</Link>
                              <button className="delete" onClick={()=>{deleteTeam(team.id)}}>Delete</button>
                         </div>
                    </div>
               </div >
          </div>
     );
}

export default TeamShow;