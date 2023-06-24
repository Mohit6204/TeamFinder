import Navbar from "./navbar/navbar";
import CreateTeam from "./CreateTeam";
import Footer from "./Footer";
import Accepted from "./accepted";
import Pending from "./pending";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard";
import Teams from "./teams";
import EditTeam from "./editteam";
import Home from './home';
import Login from './login';
import Register from './register';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { setLogin, setMyUser } from '../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import Load from "./loading";
import ApplyTeam from "./applyTeam";


function App() {
  const check=useSelector((state)=>state.auth);
  const [loading,setLoading]=useState(true);
  const dispatch=useDispatch();
  const getTeam=async ()=>{
    const token=window.localStorage.getItem("token");
    if(token){
     const res=await axios.get("http://localhost:8080/auth/getUser",{
       headers:{
         "authorization":token,
       }
     });
     if(res.status<=300){
       const {password,...curUser}=res.data;
       dispatch(setLogin(true));
       dispatch(setMyUser(curUser));
     }
    }
    setLoading(false);
  } 
   useEffect(()=>{
       getTeam();

   },[])
   return (
      loading && !check.isLogin  ? 
         <div className="flex justify-center w-full h-full my-40 ">
          <Load />
         </div>
       : 
       <div className="h-full w-full object-cover bg-slate-100">
       <Navbar />
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/Login" element={<Login />} />
         <Route path="/Register" element={<Register />} />
        {check.isLogin ? 
          <><Route path="/create" element={<CreateTeam />} />
         <Route path="/Teams" element={<Teams />} />
         <Route path="/Accepted" element={<Accepted />} />
         <Route path="/Pending" element={<Pending />} />
         <Route path="/edit/:id" element={<EditTeam />} />
         <Route path="/applyTeam" element={<ApplyTeam />} />
         </>
         : 
         null
         }
       </Routes>
       <Footer />
     </div>
  );
}

export default App;
