function Footer() {
     return (
          <footer>
               <div className=" bg-slate-800 p-6 px-10">
                    <div className=" text-white pb-4 flex justify-between px-4">
                       <div>
                         <div className=" font-bold">
                         <h2 ><span className='font-bold text-2xl '>T</span>eam<span className='font-bold'>F</span>inder</h2>
                         </div>
                         <div className=" font-extralight w-1/2 text-sm">
                         Connecting Teams, Uniting Dreams, Find Your Perfect Team with TeamFinder!
                         </div>
                       </div>
                       <div>
                           <div className=" text-sm text-center">
                              <div className="py-2 border-b-[1px]">
                                   <h1 className="py-2">Connect with us</h1>
                                   <a href="https://www.linkedin.com/in/mohit-mishra-a5084a23a/" className=" cursor-pointer px-2"><span><ion-icon name="logo-linkedin"></ion-icon></span></a>
                                   <a href="https://github.com/Mohit6204" className=" cursor-pointer px-2"><span><ion-icon name="logo-github"></ion-icon></span></a>
                              </div>
                              <h1 className=" py-2 text-xs">mishramohit6204@gmail.com</h1>
                           </div>
                       </div>
                    </div>
                   <div className=" text-white font-thin text-sm flex justify-between border-t-[1px] pt-6 ">
                       <div className="flex">
                        © TeamFinder. All rights reserved.
                       </div>
                       <div className="flex">
                         2022-2023
                       </div>
                   </div>
               </div>
          </footer>
     );
}
export default Footer;