import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setOpen,setHeading } from "../../store/mainSlice";
function NavLinks(){
    const dispatch=useDispatch();
    const navState=useSelector((state)=>state.main);
    const links=[{name:"Requests",sublinks:[
        {head:"Pending", link:'/Pending'},
        {head:"Accepted", link:'/Accepted'}
    ]},{name:"My Teams",sublinks:[
        {head:"All Teams", link:'/myTeams'},
        {head:"Join Requests", link:'/join'},
        {head:"Create Team", link:'/create'}]}]

   return(
     <>
       {links.map((link)=>(
         <div className="z-30">
            <div className="px-3 text-left cursor-default group">
                <h1 className={`md:py-7 py-3 flex justify-between cursor-pointer items-center group`} onClick={()=>{
                    navState.heading !== link.name ? dispatch(setHeading(link.name)) : dispatch(setHeading(''))
                }}>{link.name}
                
                <span className=" text-xl md:hidden inline">
                    <ion-icon name={`${navState.heading===link.name ? 'chevron-up' : 'chevron-down'}`}></ion-icon>
                </span>

                <span className=" text-xl md:ml-2 md:mt-1 md:block hidden group-hover:rotate-180 group-hover:-mt-2">
                    <ion-icon name="chevron-down"></ion-icon>
                </span>

                </h1>
                 <div>
                    <div className={` absolute top-20 hidden group-hover:md:block hover:md:block`}>
                        <div className="py-3">
                            <div className=" w-4 h-4 left-3 absolute mt-2
                                bg-white rotate-45">

                            </div>
                        </div>
                        <div className="bg-white p-3 rounded-md">
                            {link.sublinks.map((item)=>(
                              <li className="text-sm my-2.5" onClick={()=>dispatch(setHeading(''))}>
                                <Link to={`${item.link}`}>{item.head}</Link>
                              </li>
                            ))}
                        </div>
                    </div>
                 </div>
            </div>
            {/* Mobile View */}
            <div className={`${navState.heading===link.name ? 'md:hidden' : 'hidden'}`}>
                {link.sublinks.map((item)=>(
                    <li className=" py-3 pl-8 md:pr-0 pr-5" onClick={()=>{dispatch(setHeading(''));dispatch(setOpen(false))}}>
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