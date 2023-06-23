import React, { useState } from "react";
import { Link } from "react-router-dom";
function NavLinks(){
    const links=[{name:"Requests",sublinks:[
        {head:"Pending", link:'/Pending'},
        {head:"Accepted", link:'/Accepted'}
    ]},{name:"My Teams",sublinks:[
        {head:"All Teams", link:'/allTeams'},
        {head:"Join Requests", link:'/joinRequest'},
        {head:"Create Team", link:'/create'}]}]
   
        const [heading,setHeading]=useState('');

   return(
     <>
       {links.map((link)=>(
         <div>
            <div className="px-3 text-left cursor-default group">
                <h1 className="py-7 flex justify-between cursor-pointer items-center group" onClick={()=>{
                    heading !== link.name ? setHeading(link.name) : setHeading('')
                }}>{link.name}
                
                <span className=" text-xl md:hidden inline">
                    <ion-icon name={`${heading===link.name ? 'chevron-up' : 'chevron-down'}`}></ion-icon>
                </span>

                <span className=" text-xl md:ml-2 md:mt-1 md:block hidden group-hover:rotate-180 group-hover:-mt-2">
                    <ion-icon name="chevron-down"></ion-icon>
                </span>

                </h1>
                 <div>
                    <div className=" absolute top-20 hidden group-hover:md:block hover:md:block">
                        <div className="py-3">
                            <div className=" w-4 h-4 left-3 absolute mt-2
                                bg-white rotate-45">

                            </div>
                        </div>
                        <div className="bg-white p-3 rounded-md">
                            {link.sublinks.map((item)=>(
                              <li className="text-sm my-2.5">
                                <Link to={`${item.link}`}>{item.head}</Link>
                              </li>
                            ))}
                        </div>
                    </div>
                 </div>
            </div>
            {/* Mobile View */}
            <div className={`${heading===link.name ? 'md:hidden' : 'hidden'}`}>
                {link.sublinks.map((item)=>(
                    <li className=" py-3 pl-8 md:pr-0 pr-5">
                        <Link to={item.link}>{item.head}</Link>
                    </li>
                ))}
            </div>
         </div>
       ))}
     </>
   )
}

export default NavLinks;