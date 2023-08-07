import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import NavLinks from './navLinks';
import Button from './button';
import {useSelector } from 'react-redux/es/hooks/useSelector';
import { setLogin, setMyUser } from "../../store/authSlice";
import { useDispatch } from 'react-redux';
import { setOpen } from '../../store/mainSlice';

function Navbartop() {
  const dispatch=useDispatch();
  const handleLogout=()=>{
       window.localStorage.removeItem("token");
       dispatch(setLogin(false));
       dispatch(setMyUser(null));
       navigate("/");
  }

  const check=useSelector((state)=>state.auth)
  const navState=useSelector((state)=>state.main);
  const navigate=useNavigate();
  const [profile,setProfile]=useState(false);
  return (
      <nav className='bg-white shadow-lg'>
         <div className='flex items-center font-medium justify-between'>
            <div className='z-50 p-5 md:w-auto w-full flex justify-between ml-4'>
              <h2 className='cursor-pointer h-9 px-4 pl-6'><span className='font-bold text-3xl '>T</span>eam<span className='font-bold'>F</span>inder</h2>
              <div className='text-3xl md:hidden cursor-pointer transition-all' onClick={()=>dispatch(setOpen(!navState.open))}>
              <ion-icon name={`${navState.open ? 'close' : 'menu'}`}></ion-icon>
              </div>
            </div>
            <ul className='md:flex hidden items-center gap-3 '>
              <li className='flex flex-row gap-3'>
                <div className="py-7 px-3 inline-block ">
                <Link to="/" >Home</Link>
                </div>
                <div className="py-7 px-3 inline-block">
                <Link to="/dashboard">Dashboard</Link>
                </div>
              </li>
              {check.isLogin && <NavLinks />}
            </ul>
            <div className='md:block hidden mx-10 text-center'>
             {!check.isLogin ? (<>
                            <Button 
                            name="Login"
                          />
 
                    </>) :<>
                        <div className=' text-center' >
                          {profile&&<div className='absolute h-full w-full inset-0 z-40' onClick={()=>{setProfile(false)}}/>}
                          <div className=' pr-5 cursor-pointer' id='profile' onClick={()=>setProfile(!profile)}>
                             <span className=' text-3xl'><ion-icon name="person-circle-outline"></ion-icon></span>
                             <div className=' text-sm text-slate-500 '>{check.myUser.firstName}</div>
                          </div>
                          <div className={`bg-white absolute top-20 py-4 px-2 right-7 rounded-lg z-50 ${profile ? 'block' : 'hidden'} transition-all`} >
                             <div className=' text-sm py-2  hover:text-blue-700 cursor-pointer' onClick={()=>{setProfile(!profile);navigate("/viewProfile")}}>Edit Profile</div>
                             <div className=' text-sm py-1 hover:text-blue-700 cursor-pointer' onClick={()=>{setProfile(!profile);handleLogout()}}>Logout</div>
                          </div>
                        </div>
                    </>}
            </div>

            {/* Mobile view */}
            
            <ul className={`
            md:hidden bg-white/40 absolute backdrop-blur-lg w-full h-full bottom-0 py-24 pl-4
            duration-500 ${navState.open ? "left-0" : "left-[-100%]"} z-30
            `}>
              <li>
                <div className='py-3 px-3 block cursor-pointer' onClick={()=>{
                  dispatch(setOpen(false));
                  navigate("/");
                }}>
                  Home
                </div>
                <div className='py-3 px-3 block cursor-pointer' onClick={()=>{
                  dispatch(setOpen(false));
                  navigate("/dashboard");
                }}>
                  Dashboard
                </div>
              </li>
              {check.isLogin && <NavLinks />}
              <div className='py-5'>
              {!check.isLogin ? (<>
                            <div onClick={()=>dispatch(setOpen(false))}>
                            <Button 
                            name="Login"
                          />
                            </div>

                    </>) :(<div onClick={()=>{dispatch(setOpen(false));handleLogout()}}><Button name="Logout"/></div>)}
            </div>
            </ul>

         </div>
      </nav>
  );
}

export default Navbartop;