import React from "react";
import { Link} from "react-router-dom";



const Button=({name})=>{

   return(
      <Link to={`/${name}`} className="bg-white hover:shadow-md hover:shadow-slate-700 text-black border-2 px-4 py-1 rounded-full mx-2 hover:bg-black/80 hover:text-white transition-all">{name}</Link>
   )
}
export default Button;