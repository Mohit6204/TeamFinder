import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const ViewTeam = () => {
    const navigate=useNavigate();
    const check = useSelector((state) => state.auth);
    const { id } = useParams();
    const [team, setTeam] = useState({});
    const getMyTeam = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/post/team/${id}`, {
                headers: {
                    "authorization": check.myToken,
                }
            });
            setTeam(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getMyTeam();
    }, [])

    const deleteTeam = async ()=>{
        try {
            const res = await axios.delete(`http://localhost:8080/post/delete/${id}`, {
                    headers: {
                        "authorization": check.myToken,
                    }
                });
        } catch (error) {
            console.log(error);
        }
    }
    const handleDelete=()=>{
        deleteTeam();
        navigate("/dashboard");
    }
    const handleLeave= async ()=>{
        try {
            navigate("/Accepted");
        } catch (error) {
            console.log(error);
        }
    }
    const handleMember=async (user_id)=>{
        try {
            const res = await axios.delete(`http://localhost:8080/request/delete/${id}/${user_id}`, {
                    headers: {
                        "authorization": check.myToken,
                    }
                });
                setTeam(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    return (
            <>
                <div className="shadow-md rounded-lg bg-white m-6 flex flex-row">
                    <div className="flex flex-col w-1/2 border-r-2">
                        <div className="py-2">
                            <h1 className=" flex justify-center text-xl font-semibold">{team.title}</h1>
                        </div>
                        <div className="px-4 pb-3">
                            <h1>Members Required - {team.remaining}</h1>
                        </div>
                        <div className="px-4 flex justify-between">
                            <div className="flex">
                              <h1>Team Admin - {team.name}</h1>
                            </div>
                            <div className="flex py-2">
                            {
                                check.myUser._id===team.userId ? 
                                <div className="flex flex-row">
                                  <div className=" border-2 rounded-xl px-2 py-1 font-sans font-semibold hover:bg-red-700 hover:text-white cursor-pointer transition-all" onClick={()=>handleDelete()}>Delete<span><ion-icon name="trash"></ion-icon></span></div>
                                  <div className=" border-2 rounded-xl px-2 py-1 font-sans font-semibold hover:bg-gray-500 hover:text-white cursor-pointer transition-all" onClick={()=>navigate(`/edit/${id}`)}>Edit<span><ion-icon name="pencil"></ion-icon></span></div>
                                </div>
                                : <div className=" border-2 rounded-xl px-2 py-1 font-sans font-semibold hover:bg-black/80 hover:text-white cursor-pointer transition-all" onClick={()=>{handleMember(check.myUser._id);navigate("/")}}>Leave Team<span><ion-icon name="exit-outline"></ion-icon></span></div>
                            }
                             </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-1/2">
                        <div className="px-4 pb-3 flex justify-center">
                            <h1 className="text-xl font-semibold">About Team</h1>
                        </div>
                        <div className="px-4 pb-3">
                            <p>{team.description}</p>
                        </div>
                        <div className="px-4 pb-3">
                            <h1>Total Team Strength - {team.intake + 1}</h1>
                        </div>
                    </div>
                </div>
                <div className="bg-white">
                    <div className=" flex justify-center text-xl font-semibold py-2">
                        <h1>Members</h1>
                    </div>
                    <ol>
                    {team.members&&team.members.map((member)=>(
                        <li>
                          <div className="flex justify-between border-2 rounded-lg m-4 p-2">
                          <div className=" ">
                             <h1>Name - {member.name}</h1>
                             <h2>Contact Number - {member.contactNumber}</h2>
                             <h2>Email - {member.email}</h2>
                             </div>
                            { check.myUser._id===team.userId&&<div className="flex flex-col justify-center"> 
                             <div className=" flex ">
                                 <h1 className=" border-2 rounded-xl px-2 py-1 font-sans font-semibold hover:bg-red-700 hover:text-white cursor-pointer transition-all " onClick={()=>handleMember(member.id)}>Remove Member <span className=" text-xl"><ion-icon name="close-circle"></ion-icon></span></h1>
                              </div>
                             </div>}
                          </div>
                        </li>
                    ))}
                    </ol>
                </div>
                </>
    )
}
export default ViewTeam;