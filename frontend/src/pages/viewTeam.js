import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ViewTeam = () => {
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
                        <div className="px-4">
                            <h1>Team Admin - {team.name}</h1>
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
                    <div>

                    </div>
                </div>
                </>
    )
}
export default ViewTeam;