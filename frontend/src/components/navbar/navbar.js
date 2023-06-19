import React from 'react';
import {Link} from 'react-router-dom';
import NavLinks from './navLinks';
import Button from './button';
function Navbartop() {
  return (
      <nav className='bg-white '>
         <div className='flex items-center font-medium justify-around'>
            <div>
              <h2 className='cursor-pointer h-9'><span className='font-bold'>T</span>eam<span className='font-bold'>F</span>inder</h2>
            </div>
            <ul className='md:flex hidden items-center gap-8 font-[Poppins]'>
              <li>
                <Link to="/" className="py-7 px-3 inline-block">Home</Link>
                <Link to="/dashboard" className="py-7 px-3 inline-block">Dashboard</Link>
                <Link to="/create" className="py-7 px-3 inline-block">Create</Link>
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
         </div>
      </nav>
  );
}

export default Navbartop;