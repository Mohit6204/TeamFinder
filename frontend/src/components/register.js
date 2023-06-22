import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin,setMyUser } from "../store/authSlice";
import axios from "axios";

const Register=()=>{

    const dispatch=useDispatch();
    const addUser = async (newUser) => {
        try {
          const res=await axios.post("http://localhost:8080/auth/register",newUser);
          dispatch(setLogin(true));
          const {password,...curUser}=res.data.savedUser;
          dispatch(setMyUser(curUser));
           window.localStorage.setItem("token",res.data.token);
           console.log(curUser);
           navigate("/");
        } catch (error) {
          console.log(error);
        }
      }

   const navigate=useNavigate();
   const [User, setUser] = useState({
        firstName: "",
        lastName: "",
        contactNumber:null,
        number:null,
        email:"",
        password:""
   })

   function handlechange(event) {
        const { name, value } = event.target;
        setUser(user => {
             return {
                  ...user,
                  [name]: value
             };
        });
   }



    return(
        <form>
        <div className="bg-white my-[4%] md:mx-[25%] py-[5%] px-[5%] rounded-2xl shadow-md mx-10 ">
           <div className=" flex justify-center text-2xl pb-2">
               <h1 className=" font-bold text-2xl overflow-auto"><span className="px-2 z-20"><ion-icon name="person-add"></ion-icon></span>REGISTER</h1>
           </div>
           <div className=" flex flex-col justify-between overflow-auto xl:flex-row ">
           <div className=" flex justify-center py-4 flex-col xl:w-2/5 w-full">
               <label className=" pl-1 pb-2 text-slate-800" htmlFor="firstName">First Name</label>
               <input className=" border-2 rounded-lg px-2 overflow-auto" type="text" id="firstName" name="firstName" value={User.firstName} placeholder="First Name" required={true} onChange={handlechange}/>
           </div>
           <div className=" flex justify-center py-4 flex-col xl:w-2/5 w-full">
               <label className=" pl-1 pb-2 text-slate-800" htmlFor="lastName">Last Name</label>
               <input className=" border-2 rounded-lg px-2 overflow-auto" type="text" id="lastName" name="lastName" value={User.lastName} placeholder="Last Name" required={true} onChange={handlechange}/>
           </div>
           </div>
           <div className=" flex justify-center py-4 flex-col">
               <label className=" pl-1 pb-2 text-slate-800" htmlFor="contactNumber">Contact Number</label>
               <input className=" border-2 rounded-lg px-2 overflow-auto [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" type="number" id="contactNumber" name="contactNumber" value={User.contactNumber} placeholder="Enter your Contact Number" required={true} onChange={handlechange}/>
           </div>
           <div className=" flex justify-center py-4 flex-col">
               <label className=" pl-1 pb-2 text-slate-800" htmlFor="email">Email</label>
               <input className=" border-2 rounded-lg px-2 overflow-auto" type="email" id="email" name="email" value={User.email} placeholder="Enter your Email" required={true} onChange={handlechange}/>
           </div>
           <div className=" flex justify-center pb-4 flex-col">
               <label className=" pl-1 pb-2 text-slate-800" htmlFor="password">Password</label>
               <input className=" border-2 rounded-lg px-2 overflow-auto w-full" type="password" id="password" name="password" value={User.password} placeholder="Enter your Password" required={true} onChange={handlechange}/>
           </div>
           <div className=" flex justify-center pt-4">
                <button className=" cursor-pointer rounded-full text-white bg-black px-8 py-1 hover:bg-black/80 overflow-auto text-xl" onClick={(e)=>{
                    e.preventDefault();
                    addUser(User);
                }}>Submit</button>
           </div>
        </div>
        </form>
    )
}
export default Register;