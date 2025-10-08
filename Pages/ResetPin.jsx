import React, { useState } from "react";
import {  UseTransaction } from "../Context/TransactionContext";
import { UseAuth } from "../Context/AuthContext";

function ResetPin() {
  const {ResetPin } = UseTransaction();
   const{user}=UseAuth();
      const initials=(user.firstname[0]||"")+(user.lastname[0]||"")

  // separate states
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPin !== confirmPin) {
      alert("❌ Pin do not match!");
      return;
    }

    // call resetPassword (no old password check here)
    ResetPin({ newPin });

    // clear inputs
    setNewPin("");
    setConfirmPin("");
  };

  return (
    <section className="flex flex-col items-center mt-10">
         <div className='w-20 h-20 rounded-full  mx-2  items-center flex justify-center font-bold bg-blue-200 text-lg text-blue-950'>
        {initials.toUpperCase()}
        </div>

      <h2 className="text-xl font-bold">Reset Pin</h2>
      <p className="text-gray-600 text-sm mb-4">Enter your new pin below</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-80">
        <input
          type="password"
          placeholder="New Pin"
          value={newPin}
          onChange={(e) => setNewPin(e.target.value)}
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
          Reset Pin
        </button>
      </form>
    </section>
  );
}

export default ResetPin;
