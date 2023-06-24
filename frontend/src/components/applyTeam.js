import { useState } from "react";
import { useSelector } from "react-redux";

const ApplyTeam = () => {
    const [text,setText]=useState("");
    const handleChange=(event)=>{
        const {value } = event.target;
        setText(value);
    }
   
    const myState = useSelector((state) => state.main.apply);
    return (
        <>
            <div className="shadow-md rounded-lg bg-white m-6 flex flex-row">
                <div className="flex flex-col w-1/2 border-r-2">
                    <div className="py-2">
                        <h1 className=" flex justify-center text-xl font-semibold">{myState.title}</h1>
                    </div>
                    <div className="px-4 pb-3">
                        <h1>Members Required - {myState.remaining}</h1>
                    </div>
                    <div className="px-4">
                        <h1>Team Admin - {myState.adminName}</h1>
                    </div>
                    <div className=" px-4 w-full">
                        <textarea style={{resize: 'none'}} rows={5} placeholder="Say something to the admin" name="text" value={text} className="border-2 rounded-lg w-full" onChange={handleChange}/>
                    </div>
                    <div className="pb-4 flex justify-center">
                        <h1 className="p-2 border-2 rounded-full text-center cursor-pointer bg-black text-white hover:bg-black/80 duration-100 w-1/6">Apply</h1>
                    </div>
                </div>
                <div className="flex flex-col w-1/2">
                    <div className="px-4 pb-3 flex justify-center">
                        <h1 className="text-xl font-semibold">About Team</h1>
                    </div>
                    <div className="px-4 pb-3">
                        <p>{myState.description}</p>
                    </div>
                    <div className="px-4 pb-3">
                        <h1>Total Team Strength - {myState.intake+1}</h1>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ApplyTeam;