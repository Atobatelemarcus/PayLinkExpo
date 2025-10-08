import React, { useState } from "react";
import { UseTransaction } from "../Context/TransactionContext";
import { UseAuth } from "../Context/AuthContext";
import myimage from "/assets/myimage.png";

const FundAccount = () => {
  const { fundWallet, loading } = UseTransaction();
  const { user } = UseAuth();

  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleFund = async (e) => {
    e.preventDefault();

    if (!amount || Number(amount) < 100) {
      setMessage("⚠️ Minimum funding amount is ₦100");
      return;
    }

    try {
      setMessage("");
      await fundWallet(Number(amount));
      setMessage("✅ Wallet funded successfully!");
      setAmount("");
    } catch (err) {
      console.error(err);
      setMessage("❌ Funding failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center transition-transform hover:scale-[1.01]">
        <img
          src={myimage}
          alt="Paylink Logo"
          className="w-20 h-20 mx-auto mb-2 rounded-full"
        />

        <h2 className="text-2xl font-semibold text-blue-600 mb-4">
          Fund Wallet
        </h2>

        {user && (
          <div className="mb-6 bg-gray-50 border border-gray-200 rounded-xl p-3">
            <p className="text-gray-600 text-sm">Account Number</p>
            <p className="text-lg font-semibold text-blue-700 tracking-wider">
              {user.accountNumber}
            </p>
            <p className="text-gray-600 text-sm mt-2">Email</p>
            <p className="text-lg font-medium text-gray-800">
              {user.email}
            </p>
          </div>
        )}

        {message && (
          <div
            className={`mb-4 text-sm font-medium ${
              message.includes("✅")
                ? "text-green-600"
                : message.includes("⚠️")
                ? "text-yellow-600"
                : "text-red-600"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleFund} className="space-y-5">
          <div>
            <label className="block text-gray-600 mb-2 text-sm font-medium">
              Amount (₦)
            </label>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition"
              min="100"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-xl text-white font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Processing..." : "Fund Wallet"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FundAccount;
