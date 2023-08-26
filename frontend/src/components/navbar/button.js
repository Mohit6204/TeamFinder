import React from "react";
import { Link} from "react-router-dom";



const Button=({name})=>{

   return(
      <Link to={`/${name}`} className="bg-white text-black border-b-2 border-t-2 border-black px-4 py-1 rounded-full mx-2 hover:bg-black/80 hover:text-white transition-all">{name}</Link>
   )
}
export default Button;