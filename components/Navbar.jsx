import { UseAuth } from "../Context/AuthContext";
import {FaRegBell} from "react-icons/fa";

function Navbar() {
  const{user}=UseAuth();
  const initials = ((user?.firstname?.[0] || "") + (user?.lastname?.[0] || "")).toUpperCase();

  
  return (
    <>
    <nav className='w-full  fixed flex flex-row justify-between mx-auto bg-gray-100 text-black right-0 top-0 left-0'>
      <div className='flex space-x-6 align-middle m-2'> 
        <div className='w-10 h-10 rounded-full my-3 mx-2  items-center flex justify-center bg-blue-200 text-blue-950'>
        {initials}
        </div>
        
        <div className='flex flex-col gap-1 align-middle p-2'>
          <p className='text-black text-sm font-[poppin]'>Hello</p>
          <p className='text-black text-sm font-semibold font-[poppins]'> {user?.firstname} {user?.lastname}</p>
        </div>
      </div>
      <div className='mt-6  mx-2 relative space-x-0.5'>
        < FaRegBell className=" text-blue-800" size={30}/>
        <span className='text-green-600 font-bold absolute font-md  top-0 right-0'>1</span>

      </div>

    </nav>
    </>
  )
}

export default Navbar
