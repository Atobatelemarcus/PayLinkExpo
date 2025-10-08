import React, { useEffect } from "react";
import { UseTransaction } from "../Context/TransactionContext";
import { FaUser, FaArrowRight, FaUserCheck } from "react-icons/fa";

const History = () => {
  const { transactions, loading, fetchTransactions, error } = UseTransaction();

  useEffect(() => {
    fetchTransactions();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-semibold mb-6 text-center">Transaction History</h2>

      {transactions.length === 0 ? (
        <p className="text-center text-gray-500">No transactions yet.</p>
      ) : (
        <div className="flex flex-col space-y-4">
          {transactions.map((tx) => (
            <div
              key={tx._id}
              className="flex flex-col p-4 bg-white shadow-md rounded-lg hover:shadow-xl transition-shadow duration-200"
            >
              <div className="flex items-center space-x-2">
                <FaUser className="text-blue-600" />
                <p className="text-sm font-semibold">
                  {tx.sender
                    ? `${tx.sender.firstname} ${tx.sender.lastname}`
                    : "You"}
                </p>
                <FaArrowRight className="mx-2 text-gray-400" />
                <FaUserCheck className="text-green-600" />
                <p className="text-sm font-semibold">
                  {tx.recipient.firstname} {tx.recipient.lastname}
                </p>
              </div>

              <p className="text-xs text-gray-500 mt-1">{tx.description || "No note"}</p>
              <p className="text-lg font-bold mt-1">₦{tx.amount?.toLocaleString()}</p>
              <p
                className={`mt-1 font-semibold ${
                  tx.status === "completed"
                    ? "text-green-600"
                    : tx.status === "failed"
                    ? "text-red-600"
                    : "text-yellow-500"
                }`}
              >
                {tx.status}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(tx.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
