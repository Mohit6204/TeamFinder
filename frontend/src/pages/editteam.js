import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";


function EditTeam(){
     const navigate=useNavigate();
     const {id}=useParams();
     const updateTeam = async (newTeam) => {
          try {
            await axios.put(`http://localhost:3004/card/${id}`,{
               value:newTeam
            });
            console.log('clicked');
          navigate("/dashboard");
          } catch (error) {
            console.log(error);
          }
        }
        
        const [team, setTeam] = useState({
          title: "",
          description: "",
          number: 0
     })
        useEffect(()=>{
          const findTeam= async ()=>{
               try {
                    const res=await axios.get(`http://localhost:3004/card/${id}`);
                    setTeam(res.data.value);
               } catch (error) {
                     console.log(error);
               }
             }
          findTeam();
        },[])

     function handlechange(event) {
          const { name, value } = event.target;
          setTeam(pr => {
               return {
                    ...pr,
                    [name]: value
               };
          });
     }


    return(
        <div className="team-create">
        <div className="rform">
             <form>
                  <h3>Update Team.</h3>
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
                  <Button variant="primary" onClick={()=>{updateTeam(team)}}>Edit Team</Button>
             </form>
        </div>
   </div>
    );
}
export default EditTeam;