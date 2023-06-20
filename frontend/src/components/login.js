import React from "react";

const Login=()=>{

  return (
    <form>
     <div className="bg-white my-[6%] md:mx-[30%] py-[5%] px-[5%] rounded-2xl shadow-md mx-20 ">
        <div className=" flex justify-center text-2xl">
            <h1 className=" font-bold text-2xl overflow-auto"><span className="px-2 z-0"><ion-icon name="person"></ion-icon></span>LOG IN</h1>
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

export default Login;