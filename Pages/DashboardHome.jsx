import { FaEye, FaEyeSlash, FaPhone, FaWifi, FaWallet } from "react-icons/fa";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { NavLink } from "react-router-dom";
import { UseTransaction } from "../Context/TransactionContext";
import { UseAuth } from "../Context/AuthContext";

function DashboardHome() {
  const { transactions } = UseTransaction();
  const { user } = UseAuth();
  const balance = user?.balance || 0;

  const [showBalance, setShowBalance] = useState(false);

  return (
    <>
      <Navbar />
      <section className="mx-auto flex flex-col mt-20">
        {/* Wallet Balance */}
        <div className="sm:grid sm:grid-cols-1 w-full bg-blue-900 text-white rounded-lg h-30 p-4">
          <div className="flex space-x-4 items-center">
            <p className="text-slate-200 text-md">Wallet balance</p>
            <button onClick={() => setShowBalance(!showBalance)}>
              {showBalance ? <FaEyeSlash className="text-slate-200" /> : <FaEye className="text-slate-200" />}
            </button>
          </div>
          <p className="text-slate-200 text-lg">
            {showBalance ? `₦${balance?.toLocaleString() || "0"}` : "******"}
          </p>
        </div>

        {/* Account Number */}
        <p className="text-2xl font-bold tracking-wider text-blue-700 mt-2">
          {user?.accountNumber || "N/A"}
        </p>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-6 p-4">
          <NavLink to="/DataAirtime" className="flex flex-col items-center bg-white shadow-md p-4 rounded-xl hover:border hover:border-blue-800">
            <FaPhone className="text-blue-600 text-sm" />
            <p className="mt-2 font-semibold text-xs text-center">Buy Airtime</p>
          </NavLink>

          <NavLink to="/SendMoney" className="flex flex-col items-center bg-white shadow-md p-4 rounded-xl hover:border hover:border-blue-800">
            <FaWifi className="text-blue-600 text-sm" />
            <p className="mt-2 font-semibold text-xs text-center">PayLink To PayLink</p>
          </NavLink>

          <NavLink to="/Fundaccount" className="flex flex-col items-center bg-white shadow-md p-4 rounded-xl hover:border hover:border-blue-800">
            <FaWallet className="text-purple-600 text-sm" />
            <p className="mt-2 font-semibold text-xs text-center">Fund Wallet</p>
          </NavLink>
        </div>

        {/* Referral Info */}
        <div className="sm:grid sm:grid-cols-1 max-w-screen w-full p-2 mt-2 bg-blue-900 text-white rounded-lg h-15 items-center">
          <p className="text-slate-200 text-sm text-center">Invite friends to earn more</p>
          <p className="text-slate-200 text-sm text-center">Up to 10% bonus on every referral</p>
        </div>

        {/* Transaction History */}
        <div className="flex flex-col mt-2 bg-slate-100 rounded-md p-2">
          <p className="text-black/80 text-sm">Transaction</p>
          <p className="text-black font-semibold text-sm mb-2">History</p>

          <div className="flex flex-col space-y-2">
            {Array.isArray(transactions) && transactions.length > 0 ? (
              transactions.map((tx) => {
                const isOutgoing = tx.sender?._id === user?._id;

                return (
                  <div
                    className="flex items-center p-3 bg-white rounded-lg shadow-md"
                    key={tx._id}
                  >
                    {/* Sender/Receiver Arrow */}
                    <div className="flex flex-col items-center justify-center mr-2">
                      <div className={isOutgoing ? "text-red-500 text-lg" : "text-green-500 text-lg"}>
                        {isOutgoing ? "→" : "←"}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {isOutgoing ? "Sent" : "Received"}
                      </div>
                    </div>

                    {/* User Info */}
                    <div className="flex-1 flex flex-col">
                      <p className="text-xs font-bold">
                        {isOutgoing
                          ? `You → ${tx.recipient?.firstname} ${tx.recipient?.lastname}`
                          : `${tx.sender?.firstname} ${tx.sender?.lastname} → You`}
                      </p>
                      <p className="text-xs text-gray-500">{tx.description || "No note"}</p>
                      <p className="text-xs text-gray-400">{new Date(tx.createdAt).toLocaleString()}</p>
                    </div>

                    {/* Amount & Status */}
                    <div className="flex flex-col items-end">
                      <p className={`text-lg font-bold ${isOutgoing ? "text-red-600" : "text-green-600"}`}>
                        {isOutgoing ? "-" : "+"}₦{tx.amount?.toLocaleString()}
                      </p>
                      <p
                        className={`text-xs font-semibold mt-1 ${
                          tx.status === "completed"
                            ? "text-green-600"
                            : tx.status === "failed"
                            ? "text-red-600"
                            : "text-yellow-500"
                        }`}
                      >
                        {tx.status}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-gray-500">No transactions yet.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default DashboardHome;
