import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Load from "../components/loading";
function Dashboard() {
   const [val, setVal] = useState("");
   const [initial, setInitial] = useState([]);
   const navigate = useNavigate();
   const check = useSelector((state) => state.auth);
   const [myTeam, setMyTeam] = useState([]);
   const [loading, setLoading] = useState(true);
   const getTeams = async () => {
      try {
         const res = await axios.get("http://localhost:8080/post/allTeams");
         setMyTeam(res.data);
         setInitial(res.data);
         setLoading(false);
      } catch (error) {
         console.log(error);
         setLoading(false);
      }
   };
   const getLoginTeams = async () => {
      try {
         const res = await axios.get("http://localhost:8080/post/getTeams", {
            headers: {
               "authorization": check.myToken,
            }
         });
         setMyTeam(res.data);
         setInitial(res.data);
         setLoading(false);
      } catch (error) {
         console.log(error);
         setLoading(false);
      }
   }

   useEffect(() => {
      if (check.isLogin) {
         getLoginTeams();
      }
      else {
         getTeams();
      }
   }, []);

   const handleApply = async (id) => {
      try {
         if (check.isLogin) {
            navigate(`/applyTeam/${id}`)
         }
         else {
            navigate("/Login")
         }
      } catch (error) {
         console.log(error);
      }
   }
   function handlechange(event) {
      const { value } = event.target;
      const regex = new RegExp(value, 'i');
      setVal(value);
      setMyTeam(initial.filter((team) => (team.title.match(regex) || team.skillRequired.match(regex) || team.adminName.match(regex))));
   }

   return (
      loading ? <>
         <div className="flex justify-center w-full h-full my-40 ">
            <Load />
         </div>
      </> : <>
         <div className="h-screen">
            <div className="flex justify-center mt-20">
               <div class="relative text-gray-600 focus-within:text-gray-400 shadow-sm rounded-full w-80 focus-within:shadow-md border-2 focus-within:border-0 ">
                  <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                     <ion-icon name="search-outline" class="w-5 h-5"></ion-icon>
                  </span>
                  <input type="search" class="py-2 text-sm text-white bg-slate-50 rounded-full pl-10 pr-2 focus:outline-none focus:bg-white focus:text-gray-900 w-full" placeholder="Search..." value={val} onChange={handlechange} />
               </div>
            </div>
            <div className=" mx-auto py-36 px-8">
               {
                  initial.length ? 
                    myTeam.length ? <>
                                         <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
                        {myTeam.map((team) => (
                           <div className="shadow-md rounded-2xl bg-white m-6 hover:shadow-xl hover:m-5 duration-200 cursor-pointer" onClick={() => handleApply(team._id)}>
                              <div className="py-2">
                                 <h1 className=" flex justify-center text-xl font-semibold">{team.title}</h1>
                              </div>
                              <div className="px-4 pb-3">
                                 <p>{team.description}</p>
                              </div>
                              <div className="px-4 pb-3">
                                 <p>{team.skillRequired}</p>
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
                    </> : <>
                    <div className=" flex justify-center p-4 items-center flex-col">
                        <h1 className=" text-xl font-medium">Oops, it looks like the team you searched for does not exist.</h1>
                        <h1 className="py-2">We suggest you to try different keywords.</h1>
                     </div>
                    </>
                   : <>
                     <div className=" flex justify-center p-4 items-center">
                        <h1 className=" text-xl font-medium">Sorry, no team is available now.</h1>
                     </div>
                  </>
               }
            </div>
         </div>
      </>
   );
}
export default Dashboard;