import React from 'react'
import { UseAuth } from '../Context/AuthContext'
import { NavLink } from "react-router-dom";
import { FaCog,FaUser } from 'react-icons/fa';
import myimage from '/assets/myimage.png'
function Settings() {
  const {logout}=UseAuth()
  return (
    <>
     <section className='w-full mx-auto flex flex-col items-center gap-6'>
      <div className='flex flex-col items-center m-1'>
        <img src={myimage} alt="myimage" className='w-20 h-20 rounded-full' />
      </div>
       <p className='text-blue-950 text-lg font-semibold font-[poppin]' >PAYLINK AFRICA</p>
      <div className='w-full max-w-md border border-black/50 flex flex-row justify-between p-3 rounded-md m-2 hover:border-purple-600'>
        <p className='text-blue-950 text-sm font-bold'>EDIT PROFILE</p>
        <span className='text-blue-950 font-bold text-sm'><FaUser/></span>
      </div>
      
      <NavLink to='/Security' className="w-full max-w-md m-2 ">
      <div className='w-full max-w-md border border-blue-950 flex flex-row justify-between p-3 rounded-md hover:border-purple-600'>
        <p className='text-blue-950 text-sm font-bold'>SECURITY SETTINGS</p>
        <span className='text-blue-950 font-bold text-md'><FaCog/></span>
      </div>
      </NavLink>
      

      <div className='w-full max-w-md border border-blue-950 flex flex-row justify-between p-3 rounded-md m-2 hover:border-purple-600'>
        <p className='text-blue-950 text-sm font-bold'>CLOSE ACCOUNT</p>
         <p className='text-blue-950 text-sm font-semibold font-[poppin]' ></p>
      </div>
      <div className='w-full max-w-md border border-blue-950 flex flex-row justify-between p-3 rounded-md m-2 hover:border-purple-600'>
        <p className='text-blue-950 text-sm font-bold'>FAQS & CONDITION</p>
         <p className='text-blue-950 text-sm font-semibold font-[poppin]' ></p>
      </div>
      <div className='w-full max-w-md border border-blue-950 flex flex-row justify-between p-3 rounded-md m-2 hover:border-purple-600'>
        <p className='text-blue-950 text-sm font-bold'>TERMS AND CONDITION</p>
         <p className='text-blue-950 text-sm font-semibold font-[poppin]' ></p>
      </div>
      <div className='w-full max-w-md border border-blue-950 flex flex-row justify-between p-3 rounded-md m-2 hover:border-purple-600'>
        <p className='text-blue-950 text-sm font-bold'>ABOUT</p>
        <p className='text-blue-950 text-sm font-semibold font-[poppin]' >V.2.2.2</p>
      </div>
      <button onClick={logout} className='p-3 rounded-md m-2 bg-red-700 hover:bg-red-500 items-center text-white text-sm font-bold'>LOG OUT</button>

    </section>
    </>
  )
}

export default Settings