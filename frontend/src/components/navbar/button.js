import React from "react";

const Button=({name})=>{
   return(
      <button className="bg-white text-black border-b-2 border-t-2 border-black px-4 py-1 rounded-full mx-2 hover:bg-black hover:text-white">{name}</button>
   )
}
export default Button;