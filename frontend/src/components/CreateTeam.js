import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Createteam() {
    
     const addTeam = async (newTeam) => {
          try {
            await axios.post('http://localhost:3004/card', {
              value: newTeam
            });
            setTeam({
               title: "",
               description: "",
               number: 0
          });
          navigate('/dashboard');
          } catch (error) {
            console.log(error);
          }
        }

     const navigate=useNavigate();
     const [team, setTeam] = useState({
          title: "",
          description: "",
          number: 0
     })

     function handlechange(event) {
          const { name, value } = event.target;
          setTeam(pr => {
               return {
                    ...pr,
                    [name]: value
               };
          });
     }

     return (
          <div className="team-create">
               <div className="rform">
                    <form>
                         <h3>Add Team Details.</h3>
                         <div>
                              <label htmlFor="title">Title</label>
                              <br></br>
                              <input type="text" id="title" onChange={handlechange} name="title" value={team.title}></input>
                         </div>
                         <div>
                              <label htmlFor="discription">Discription</label>
                              <br></br>
                              <textarea id="description" onChange={handlechange} name="description" value={team.description}></textarea>
                         </div>
                         <div>
                              <label htmlFor="req">Number of Requirements</label>
                              <br></br>
                              <input type="number" id="req" onChange={handlechange} name="number" value={team.number}></input>
                         </div>
                         <br></br>
                         <Button variant="primary" onClick={()=>{addTeam(team)}}>Submit</Button>
                    </form>
               </div>
          </div>
     );
}
export default Createteam;