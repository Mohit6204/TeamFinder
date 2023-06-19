import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import NavLinks from './navLinks';
import Button from './button';
function Navbartop() {
  const [open,setOpen]=useState(false);
  return (
      <nav className='bg-white '>
         <div className='flex items-center font-medium justify-around'>
            <div className='z-50 p-5 md:w-auto w-full flex justify-between'>
              <h2 className='cursor-pointer h-9'><span className='font-bold text-3xl '>T</span>eam<span className='font-bold'>F</span>inder</h2>
              <div className='text-3xl md:hidden cursor-pointer' onClick={()=>setOpen(!open)}>
              <ion-icon name={`${open ? 'close' : 'menu'}`}></ion-icon>
              </div>
            </div>
            <ul className='md:flex hidden items-center gap-3 font-[Poppins]'>
              <li>
                <div className="py-7 px-3 inline-block">
                <Link to="/">Home</Link>
                </div>
                <div className="py-7 px-3 inline-block">
                <Link to="/dashboard">Dashboard</Link>
                </div>
                <div className="py-7 px-3 inline-block">
                <Link to="/create">Create</Link>
                </div>
              </li>
              <NavLinks />
            </ul>
            <div className='md:block hidden'>
              <Button 
                name="Login"
              />
               <Button 
                name="Register"
              />
            </div>

            {/* Mobile view */}
            
            <ul className={`
            md:hidden bg-white absolute w-full h-full bottom-0 py-24 pl-4
            duration-500 ${open ? "left-0" : "left-[-100%]"}
            `}>
              <li>
                <Link to="/" className="py-3 px-3 block">Home</Link>
                <Link to="/dashboard" className="py-3 px-3 block">Dashboard</Link>
                <Link to="/create" className="py-4 px-3 block">Create</Link>
              </li>
              <NavLinks />
              <div className='py-5'>
              <Button 
                name="Login"
              />
               <Button 
                name="Register"
              />
            </div>
            </ul>

         </div>
      </nav>
  );
}

export default Navbartop;