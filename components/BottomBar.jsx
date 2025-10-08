import React from 'react'
// components/BottomBar.jsx
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaCog, FaPlus,FaHome, FaUser, FaHistory } from 'react-icons/fa';


export default function BottomBar() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) setShow(false);
      else setShow(true);
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`fixed bottom-0 p-2  left-0  right-0 w-full rounded-t-xl bg-white border-t border-white shadow-md flex justify-around  transition-transform duration-300 ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <NavLink to="/DashboardHome">
      <div className='flex flex-col items-center hover:text-blue-600'>
        <FaHome className='text-blue-950 hover:text-green-600'/>
        <p className='text-xs text-blue-950'>Home</p>
      </div>
      </NavLink>
       <NavLink to="/History">
      <div className='flex flex-col items-center hover:text-blue-600'>
        <FaHistory className='text-blue-950 hover:text-green-600'/>
      <p className='text-xs text-blue-950'>History</p>
      </div>
     </NavLink>
      <NavLink to="/DataAirtime">
      <div className='flex flex-col items-center hover:text-blue-600'>
        <FaPlus size={10} className='rounded-full w-8 h-8 text-blue-950 hover:bg-green-800  hover:text-white'/>
      <p className='text-xs text-blue-950'>Fund Wallet</p>
      </div>
     </NavLink>
      <NavLink to="/Settings">
      <div className='flex flex-col items-center hover:text-green-600'>
        <FaCog className='text-blue-950 hover:text-green-600'/>
      <p className='text-xs text-blue-950'>Settings</p>
      </div>
     </NavLink>
      <NavLink to="/profile">
      <div className='flex flex-col items-center hover:text-green-600'>
        <FaUser className='text-blue-950 hover:text-green-600'/>
      <p className='text-xs text-blue-950'>User</p>
      </div>
     </NavLink>

      
    </div>
  );
}
