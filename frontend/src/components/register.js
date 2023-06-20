import React from "react";

const Register=()=>{

    return(
        <form>
        <div className="bg-white my-[4%] md:mx-[25%] py-[5%] px-[5%] rounded-2xl shadow-md mx-10 ">
           <div className=" flex justify-center text-2xl pb-2">
               <h1 className=" font-bold text-2xl overflow-auto"><span className="px-2"><ion-icon name="person-add"></ion-icon></span>REGISTER</h1>
           </div>
           <div className=" flex flex-col justify-between overflow-auto xl:flex-row ">
           <div className=" flex justify-center py-4 flex-col xl:w-2/5 w-full">
               <label className=" pl-1 pb-2 text-slate-800">First Name</label>
               <input className=" border-2 rounded-lg px-2 overflow-auto" type="text" placeholder="First Name" required={true}/>
           </div>
           <div className=" flex justify-center py-4 flex-col xl:w-2/5 w-full">
               <label className=" pl-1 pb-2 text-slate-800">Last Name</label>
               <input className=" border-2 rounded-lg px-2 overflow-auto" type="text" placeholder="Last Name" required={true}/>
           </div>
           </div>
           <div className=" flex justify-center py-4 flex-col">
               <label className=" pl-1 pb-2 text-slate-800">Contact Number</label>
               <input className=" border-2 rounded-lg px-2 overflow-auto [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" type="number" placeholder="Enter your Contact Number" required={true}/>
           </div>
           <div className=" flex justify-center py-4 flex-col">
               <label className=" pl-1 pb-2 text-slate-800">Email</label>
               <input className=" border-2 rounded-lg px-2 overflow-auto" type="email" placeholder="Enter your Email" required={true}/>
           </div>
           <div className=" flex justify-center pb-4 flex-col">
               <label className=" pl-1 pb-2 text-slate-800">Password</label>
               <input className=" border-2 rounded-lg px-2 overflow-auto w-full" type="password" placeholder="Enter your Password" required={true}/>
           </div>
           <div className=" flex justify-center pt-4">
                <button className=" cursor-pointer rounded-full text-white bg-black px-8 py-1 hover:bg-black/80 overflow-auto text-xl">Submit</button>
           </div>
        </div>
        </form>
    )
}
export default Register;