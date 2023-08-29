import React from "react";
import SVG from '../images/team'

const Home= ()=>{
  return (
     <div className="min-h-screenh-screen bg-white">
       <div className="flex border-t-2 gap-2 flex-col md:flex-row">
          <div className="md:flex-1 bg-white flex justify-center flex-col text-center mx-auto">
              <h1 className=" font-bold text-7xl md:text-9xl">
                Team
              </h1>
              <h1 className=" font-bold text-2xl">
                 Finder
              </h1>
               <p className="p-4">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus praesentium facilis ullam possimus vitae harum corrupti debitis nostrum minus quis, non ipsa eos. Quo debitis ut dolorum, accusamus ipsa dolorem.</p>
          </div>
          <div className="flex md:flex-1">
             <SVG className="scale-75"/>
          </div>
       </div>
     </div>
  )
}
export default Home;