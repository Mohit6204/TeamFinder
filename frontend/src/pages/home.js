import React from "react";
import SVG from '../images/team'

const Home= ()=>{
  return (
     <div className="min-h-screenh-screen bg-white">
       <div className="flex border-t-2 gap-2 flex-col md:flex-row">
          <div className="md:flex-1 bg-white flex justify-center flex-col text-center mx-auto px-4">
              <h1 className=" font-bold text-7xl md:text-9xl">
                Team
              </h1>
              <h1 className=" font-bold text-3xl py-2">
                 Finder
              </h1>
               <p className="p-4 text-xl font-light">Welcome to TeamFinder - Your Ultimate Team Building Solution</p>
               <p className="p-4 px-2 text-sm tracking-wider leading-6 text-slate-500">Building successful teams starts here. Discover your ideal teammates with TeamFinder - the cutting-edge app designed to connect you with like - minded individuals who share your goals and passions. Whether you're an entrepreneur with a groundbreaking startup idea, a sports enthusiast looking to join a recreational team, or someone seeking collaborators for a creative project, TeamFinder has you covered.</p>
          </div>
          <div className="flex md:flex-1">
             <SVG className="scale-75"/>
          </div>
       </div>
     </div>
  )
}
export default Home;