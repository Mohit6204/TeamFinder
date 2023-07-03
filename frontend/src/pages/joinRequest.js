import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Load from "../components/loading";

function Join() {

     const navigate = useNavigate();
     const check = useSelector((state) => state.auth);
     const [myTeam, setMyTeam] = useState([]);
     const [loading, setLoading] = useState(true);

     const getjoin = async () => {
          try {
               const res = await axios.get("http://localhost:8080/request/join", {
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
          getjoin();
     }, [])

     const handleConfirm = async (team_id, user_id, isConfirmed) => {
          try {
               const value = { team_id, user_id, isConfirmed };
               const res = await axios.post("http://localhost:8080/request/confirmation", value, {
                    headers: {
                         "authorization": check.myToken,
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
          </> :
               myTeam.length ? <>
                    <div className=" flex my-4 flex-col mt-10 ">
                         {myTeam.map((team) => (
                              <div className="flex bg-white my-2 mx-10 rounded-2xl px-4 py-2 flex-row justify-between shadow-md">
                                   <div className=" flex flex-col">
                                        <div>
                                             <div className="py-2">
                                                  <h1 className=" flex text-3xl font-medium">{team.title}</h1>
                                             </div>
                                             <div className="">
                                                  <h1><span className=" text-xl font-medium">{team.size}</span><span className=" text-xs"> Members</span></h1>
                                             </div>
                                             <div className="py-1 font-normal text-xl">
                                                  <p className=" font-sans">{team.skillRequired}</p>
                                             </div>
                                             <div >
                                                  <h1 className=" font-medium ">User's message</h1>
                                                  <h1 className="pl-2 text-slate-600 text-sm pb-2">"{team.message}"</h1>
                                             </div>
                                        </div>
                                        <div className=" border-2 rounded-xl p-1">
                                             <div className=" justify-center">
                                                  <h1 className=" text-lg pl-1">Requested by</h1>
                                                  <div className=" w-32">
                                                       <hr className=" w-full rounded-full bg-black border-[1px] border-gray-200 " />
                                                  </div>
                                             </div>
                                             <div className="py-2 text-center flex justify-start flex-col">
                                              <div className=" px-2">
                                              <div className="flex">
                                                  <h1 className="">{team.name}</h1>
                                                  </div>
                                                  <div className="flex">
                                                  <h3 className=" font-sans">{team.skill}</h3>
                                                  </div>
                                                   <div className=" flex flex-row justify-between">
                                                   <div className="flex">
                                                  <h2 className=" text-sm text-slate-500">+91{team.contactNumber}</h2>
                                                  </div>
                                                  <div className="flex">
                                                  <h2 className=" text-sm text-slate-500">{team.email}</h2>
                                                  </div>
                                                   </div>
                                              </div>
                                             </div>
                                        </div>
                                   </div>
                                   <div className=" flex flex-col justify-between py-2">
                                        <div className=" flex pt-2">
                                             <h1 className="text-sm hover:shadow-md hover:shadow-green-500 border-2 rounded-xl px-2 py-[1px] font-sans font-semibold hover:bg-green-700 hover:text-white cursor-pointer transition-all " onClick={() => handleConfirm(team.team_id, team.user_id, true)}>Accept <span className=" text-xl"><ion-icon name="checkmark"></ion-icon></span></h1>
                                        </div>
                                        <div className=" flex pb-2">
                                             <h1 className="text-sm hover:shadow-md hover:shadow-red-500 border-2 rounded-xl px-2 py-[1px] font-sans font-semibold hover:bg-red-700 hover:text-white cursor-pointer transition-all " onClick={() => handleConfirm(team.team_id, team.user_id, false)}>Cancel <span className=" text-lg"><ion-icon name="close-circle"></ion-icon></span></h1>
                                        </div>
                                   </div>
                              </div>
                         ))}
                    </div>
               </> : <>
                    <div className=" flex justify-center p-4 h-screen items-center">
                         <h1 className=" text-xl font-medium">Sorry, no user has requested to join yet.</h1>
                    </div>
               </>

     );
}
export default Join;