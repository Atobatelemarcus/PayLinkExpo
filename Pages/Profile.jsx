import React from 'react'
import { UseAuth } from '../Context/AuthContext';

function Profile() {
  const{user,logout}=UseAuth();
    const initials=(user.firstname[0]||"")+(user.lastname[0]||"")
  return (
    <>
    <section className='w-full mx-auto flex flex-col items-center gap-6'>
      <div className='flex flex-col items-center mx-2'>
       <div className='w-20 h-20 rounded-full  mx-2  items-center flex justify-center font-bold bg-blue-200 text-lg text-blue-950'>
        {initials.toUpperCase()}
        </div>
      </div>
       <p className='text-blue-950 text-sm md:text-lg font-semibold font-[poppin]' > {user.firstname}  {user.lastname}</p>
      <div className='w-full max-w-md border border-blue-950 flex flex-row justify-between p-3 rounded-md hover:border-green-600'>
        <p className='text-blue-950 text-sm font-bold'>ACCOUNT TIER</p>
        <span className='text-blue-950 font-bold text-sm'>Tier 2</span>
      </div>
      <div className='w-full max-w-md border border-blue-950 flex flex-row justify-between p-3 rounded-md m-2 hover:border-green-600'>
        <p className='text-blue-950 text-sm font-bold'>PAYLINK</p>
        <span className='text-blue-950 font-bold text-sm'>{user?.accountNumber}</span>
      </div>
      <div className='w-full max-w-md border border-blue-950 flex flex-row justify-between p-3 rounded-md m-2 hover:border-green-600'>
        <p className='text-blue-950 text-sm font-bold'>EMAIL</p>
         <p className='text-blue-950 text-sm font-semibold font-[poppin]' >{user?.email}</p>
      </div> 
      <div className='w-full max-w-md border border-blue-950 flex flex-row justify-between p-3 rounded-md m-2 hover:border-green-600'>
        <p className='text-blue-950 text-sm font-bold'>MOBILE NO</p>

         <p className='text-blue-950 text-sm font-semibold font-[poppins]' >{user?.phone}</p>
      </div>
      <div className='w-full max-w-md border border-blue-950 flex flex-row justify-between p-3 rounded-md m-2 hover:border-green-600'>
        <p className='text-blue-950 text-sm font-bold'>DATE OF BIRTH</p>
         <p className='text-blue-950 text-sm font-semibold font-[poppins]' >{user?.dob}</p>
      </div>
      <div className='w-full max-w-md border border-blue-950 flex flex-row justify-between p-3 rounded-md m-2 hover:border-green-600'>
        <p className='text-blue-950 text-sm font-bold'>GENDER</p>
        <p className='text-blue-950 text-sm font-semibold font-[poppins]' >{user?.gender}</p>
      </div>
      <button onClick={logout} className='p-3 rounded-md m-2 bg-red-700 hover:bg-red-500 items-center text-white text-sm font-bold'>LOG OUT</button>

    </section>
    </>
      
  
  );
}

export default Profile