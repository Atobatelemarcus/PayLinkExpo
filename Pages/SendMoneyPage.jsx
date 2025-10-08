import React, { useState } from "react";
import { UseTransaction } from "../Context/TransactionContext"; 
import { UseAuth } from "../Context/AuthContext";
export default function SendMoneyPage() {
  const { addTransaction, transactions, pin: savedPin } = UseTransaction(); // ✅ use savedPin
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const{user}=UseAuth();
  const initials = ((user?.firstname?.[0] || "") + (user?.lastname?.[0] || "")).toUpperCase();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!recipient || !amount || Number(amount) <= 0) {
      return setError("Please fill all fields with a valid amount");
    }

    if (!/^\d{10}$/.test(recipient)) {
      return setError("Recipient number must be exactly 10 digits");
    }

    if (savedPin !== pin) {   // ✅ compare against savedPin from context
      return setError("Incorrect Pin");
    }

    addTransaction({
      id: Date.now(),
      recipient,
      amount: Number(amount),
      note,
      status: "success",
      pin,
    });

    setRecipient("");
    setAmount("");
    setNote("");
    setPin("");
    alert("Transaction created!");
  };

  return (
    <div className="p-6 w-full max-w-md mx-auto bg-gradient-to-br from-blue-50 to-blue-100 items-center rounded-md shadow-md mt-20">
      <div className="flex flex-col justify-center items-center">
        <div className='w-20 h-20 rounded-full my-3 mx-2  items-center flex flex-col justify-center bg-blue-200 text-blue-950'>
        <p className="items-center font-bold text-lg text-center text-blue-950">
        {initials}
        </p>
       
        </div>
      </div>
      <p className="text-lg text-blue-950 text-center font-bold">SEND MONEY</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-2">
        <input
          placeholder="Recipient (10-digit number)"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <input
          placeholder="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <input
          placeholder="Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <input
          placeholder="Pin"
          type="password"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button className="bg-blue-600 text-white py-2 rounded">Send</button>
      </form>

      <h2 className="mt-6 font-bold text-lg">Transactions</h2>
      <ul>
        {Array.isArray(transactions) && transactions.map((tx) => (
          <li key={tx.id} className="border p-2 rounded my-1">
            {tx.recipient} - <del>N</del>{tx.amount}({tx.status})
          </li>
        ))}
      </ul>
    </div>
  );
}
