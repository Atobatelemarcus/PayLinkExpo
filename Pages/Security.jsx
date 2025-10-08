import React from 'react'
import { FaCog,FaUser } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { UseAuth } from '../Context/AuthContext';

function Security() {
 const{user}=UseAuth();
    const initials=(user.firstname[0]||"")+(user.lastname[0]||"")



  return (
    <>
    <section className='w-full mx-auto flex flex-col items-center gap-6 justify-center mt-20'>
       <div className='w-20 h-20 rounded-full  mx-2  items-center flex justify-center font-bold bg-blue-200 text-lg text-blue-950'>
        {initials.toUpperCase()}
        </div>

          <p className='text-blue-950 text-sm font-bold m-2 text-center'>PERSONAL SECURITY PAGE</p>
         <NavLink to='/Changepass' className="w-full max-w-md ">
            <div className='w-full max-w-md border border-blue-950 flex flex-row justify-between p-3 rounded-md m-2 hover:border-purple-600'>
                <p className='text-blue-950 text-sm font-bold'>Change password</p>
                <span className='text-blue-950 font-bold text-sm'><FaUser/></span>
              </div>
         </NavLink>
         <NavLink to='/CreatePin' className="w-full max-w-md m-2 ">
            <div className='w-full max-w-md border border-blue-950 flex flex-row justify-between p-3 rounded-md m-2 hover:border-purple-600'>
                <p className='text-blue-950 text-sm font-bold'>Create Pin</p>
                <span className='text-blue-950 font-bold text-sm'><FaUser/></span>
              </div>
         </NavLink>
        
        <NavLink to="/PaymentPin" className="w-full max-w-md m-2 ">
            <div className='w-full max-w-md border border-blue-950 flex flex-row justify-between p-3 rounded-md m-2 hover:border-purple-600'>
                <p className='text-blue-950 text-sm font-bold'>Change payment pin</p>
                <span className='text-blue-950 font-bold text-sm'><FaUser/></span>
              </div>
        </NavLink>

        


    </section>
    </>
  )
}

export default Security