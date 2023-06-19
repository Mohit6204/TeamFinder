import React from "react";
function NavLinks(){
    const links=[{name:"Requests"},{name:"MyTeam"}]
   return(
     <>
       {links.map((link)=>(
         <div>
            <div>
                <h1>{link.name}</h1>
            </div>
         </div>
       ))}
     </>
   )
}

export default NavLinks;