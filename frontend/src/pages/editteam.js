import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { useSelector } from "react-redux";

function EditTeam() {
     const {id}=useParams();
     const check=useSelector((state)=>state.auth);
     const saveChanges = async (newTeam) => {
         try {
            if(check.myToken){
               newTeam.remaining=newTeam.intake;
            const res=await axios.patch(`http://localhost:8080/post/editTeam/${id}`,newTeam,{
               headers:{
                    "authorization":check.myToken,
               }
            });
            }
            else{
               console.log("Access Denied");
            }
         } catch (error) {
           console.log(error);
         }
       }
 
    const navigate=useNavigate();
    const [team, setTeam] = useState({});
 
    function handlechange(event) {
         const { name, value } = event.target;
         setTeam(myTeam => {
              return {
                   ...myTeam,
                   [name]: value
              };
         });
    }
    const getTeam=async()=>{
     try {
          const res=await axios.get(`http://localhost:8080/post/edit/${id}`,{
               headers:{
                    "authorization":check.myToken,
               }
            });
          setTeam(res.data);
     } catch (error) {
          console.log(error);
     }
    }
    useEffect(()=>{
      getTeam();
    },[])
 
     return(
         <form>
         <div className="bg-white my-[4%] md:mx-[25%] py-[5%] px-[5%] rounded-2xl shadow-md mx-10 ">
            <div className=" flex justify-center text-2xl pb-2">
                <h1 className=" font-bold text-2xl overflow-auto">Edit Your Team</h1>
            </div>
            <div className=" flex justify-center py-4 flex-col w-full">
                <label className=" pl-1 pb-2 text-slate-800" htmlFor="title">Title</label>
                <input className=" border-2 rounded-lg px-2 overflow-auto w-full" type="text" id="title" name="title" value={team.title} placeholder="Title" required={true} onChange={handlechange}/>
            </div>
            <div className=" flex justify-center py-4 flex-col w-full">
                <label className=" pl-1 pb-2 text-slate-800" htmlFor="description">Team Description</label>
                <textarea style={{resize: 'none'}} className=" border-2 rounded-lg px-2 overflow-auto w-full" id="description" name="description" rows={4} value={team.description} required={true} onChange={handlechange}/>
            </div>
            <div className=" flex justify-center py-4 flex-col">
                <label className=" pl-1 pb-2 text-slate-800" htmlFor="intake"> Required number of members</label>
                <input className=" border-2 rounded-lg px-2 overflow-auto [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" type="number" id="intake" name="intake" value={team.intake} placeholder="Intake" required={true} onChange={handlechange}/>
            </div>
            <div className=" flex justify-center pt-4">
                 <button className=" cursor-pointer rounded-full text-white bg-black px-8 py-1 hover:bg-black/80 overflow-auto text-xl" onClick={(e)=>{
                     e.preventDefault();
                     saveChanges(team);
                     navigate("/myTeams");
                 }}>Save</button>
            </div>
         </div>
         </form>
     )
}
export default EditTeam;