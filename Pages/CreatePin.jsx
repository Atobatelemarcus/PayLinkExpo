import React, { useState } from "react";
import {  UseTransaction } from "../Context/TransactionContext";
import { UseAuth } from "../Context/AuthContext";



function CreatePin() {
  const {createpin} = UseTransaction();
const{user}=UseAuth();
  const initials = ((user?.firstname?.[0] || "") + (user?.lastname?.[0] || "")).toUpperCase();
  // separate states
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (pin !== confirmPin) {
      alert("❌ Pin do not match!");
      return;
    }

    // call resetPassword (no old password check here)
    createpin(pin);

    // clear inputs
    setPin("");
    setConfirmPin("");
  };

  return (
    <section className="flex flex-col items-center mt-10">
         <div className='w-20 h-20 rounded-full  mx-2  items-center flex justify-center font-bold bg-blue-200 text-lg text-blue-950'>
        {initials.toUpperCase()}
        </div>
      <h2 className="text-xl font-bold">Create Pin</h2>
      <p className="text-gray-600 text-sm mb-4">Enter your new pin below</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-80">
        <input
          type="password"
          placeholder="New Pin"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Confirm New Pin"
          value={confirmPin}
          onChange={(e) => setConfirmPin(e.target.value)}
          className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          create Pin
        </button>
      </form>
    </section>
  );
}

export default CreatePin;
