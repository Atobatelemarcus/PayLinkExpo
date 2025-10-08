import React from 'react'
import { useState } from 'react'
import { UseAuth } from '../Context/AuthContext';

function Forgetpass() {
  const {forgetPassword}= UseAuth();
const [identifier,setIdentifier]=useState({forget:""});

const handleChange = (e) => {
  setIdentifier({ ...identifier, [e.target.name]: e.target.value });
}
const handleSubmit = (e) => {
  e.preventDefault();
  forgetPassword(identifier.forget); // ✅ send the string only
  console.log(identifier.forget);
  setIdentifier({ forget: '' });
};

  return (
    <>
    <section className="w-full mx-auto flex flex-col items-center gap-6 justify-center mt-10">
        <p className='text-black/90 text-lg text-center font-bold'>Forgot password</p>
        <p className='text-black/90 text-sm text-center font-semibold'>Kindly enter the email or phone number associated with your account</p>
        <div className='flex flex-col'>
            <form onSubmit={handleSubmit}>
                
                <input
                    name="forget"
                    value={identifier.forget}
                    onChange={handleChange}
                    placeholder="Phone or mail"
                    type="text"
                    className="w-full px-6 py-3 border rounded-md my-5 border-black/50 focus:ring focus:ring-blue-400"
                />
    
        <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-green-600 my-3 w-full border border-gray-300 focus:ring focus:ring-blue-400"
      >
        Send Code
      </button>
            </form>

        </div>
    </section>
    </>
  )
}

export default Forgetpass