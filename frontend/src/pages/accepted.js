import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Load from "../components/loading";

function Accepted() {

   const navigate = useNavigate();
   const check = useSelector((state) => state.auth);
   const [myTeam, setMyTeam] = useState([]);
   const [loading, setLoading] = useState(true);
   const getAccepted = async () => {
      try {
         const res = await axios.get("http://localhost:8080/request/accepted", {
            headers: {
               "authorization": check.myToken,
            }
         });
         setMyTeam(res.data);
         setLoading(false);
      } catch (error) {
         console.log(error);
         setLoading(false);
      }
   }
   useEffect(() => {
      getAccepted();
   }, [])

   const handleView = (team) => {
      try {
         navigate(`/team/${team.id}`)
      } catch (error) {

      }
   }

   return (
      loading ? <>
         <div className="flex justify-center w-full h-full my-40 ">
            <Load />
         </div>
      </> : 
         myTeam.length ? <>
         <div className=" mx-auto py-36 px-8">
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
               {myTeam.map((team) => (
                  <div className="shadow-md rounded-2xl bg-white m-6 hover:shadow-xl hover:m-5 duration-200 cursor-pointer" onClick={() => handleView(team)}>
                     <div className="py-2">
                        <h1 className=" flex justify-center text-xl font-semibold">{team.title}</h1>
                     </div>
                     <div className="px-4 pb-3">
                        <p>{team.description}</p>
                     </div>
                     <div className="px-4 pb-3">
                        <h1>Team Size - {team.size}</h1>
                     </div>
                     <div className="px-4 pb-3">
                        <h1>Admin Name - {team.adminName}</h1>
                     </div>
                  </div>

               ))}
            </div>
         </div>
      </> : <>
          <div className=" flex justify-center p-4 h-screen items-center flex-col">
               <h1 className=" text-xl font-medium">Sorry, you are not added to any team yet.</h1>
               <div className="py-2 hover:text-blue-600 cursor-pointer" onClick={()=>navigate("/Pending")}>Your Requests</div>
          </div>
          </>
   );
}
export default Accepted;