import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { UseAuth } from "./AuthContext";

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const { user, token } = UseAuth();

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const PAYSTACK_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  

  const config = token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : {};

  // ✅ FETCH WALLET BALANCE
  const fetchBalance = async () => {
    if (!user) return;
    try {
      const res = await axios.get(`${API_BASE}/api/transactions/balance`, config);
      setBalance(res.data.amount || 0);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  // ✅ FETCH TRANSACTION HISTORY
  const fetchTransactions = async () => {
    if (!user) return;
    try {
      const res = await axios.get(`${API_BASE}/api/transactions/history`, config);
      setTransactions(res.data.transactions || res.data || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  // ✅ FUND WALLET USING PAYSTACK
  const fundWallet = async (amount) => {
    if (!window.PaystackPop) {
      alert("⚠️ Paystack script not loaded. Refresh the page.");
      return;
    }
    if (!user || !PAYSTACK_KEY) {
      alert("Missing user or Paystack key.");
      return;
    }

    setLoading(true);

    try {
      // Step 1: Initialize payment on backend
      const initRes = await axios.post(`${API_BASE}/api/paystack/initialize`, {
        email: user.email,
        amount,
      }, config);

      const { reference } = initRes.data.data;
      if (!reference) throw new Error("Payment reference missing.");

      // Step 2: Setup Paystack inline payment
      const handler = window.PaystackPop.setup({
        key: PAYSTACK_KEY,
        email: user.email,
        amount: amount * 100, // Paystack uses kobo
        ref: reference,
        callback: function (response) {
          console.log("✅ Paystack callback:", response);

          // Wrap async verification inside a normal function
          (async () => {
            try {
              const verifyRes = await axios.post(
                `${API_BASE}/api/paystack/verify`,
                {
                  reference: response.reference,
                  userId: user._id,
                  amount,
                },
                config
              );

              alert(verifyRes.data.message || "Payment verified successfully!");
              await fetchBalance();
              await fetchTransactions();
            } catch (err) {
              console.error("❌ Verification failed:", err);
              alert("Verification failed: " + (err.response?.data?.message || err.message));
            }
          })();
        },
        onClose: function () {
          alert("Payment window closed.");
        },
      });

      handler.openIframe();
    } catch (err) {
      console.error("❌ Fund wallet error:", err);
      alert(err.response?.data?.message || err.message);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Auto-load balance & transactions on login
  useEffect(() => {
    if (user && token) {
      fetchBalance();
      fetchTransactions();
    }
  }, [user, token]);


  //send money 

  // ✅ Send money
  const sendMoney = async (recipientAccount, amount, note) => {
    if (!user) return alert("You must be logged in");
    setLoading(true);

    try {
      const res = await axios.post(
        `${API_BASE}/api/transactions/send`,
        {
          senderId: user?._id, // logged-in user's ID
          recipientAccount: Number(recipientAccount),

          amount,
          note,
        },
        config
      );

      // ✅ Update transaction history with the new transaction
      const tx = res.data.transaction;
      setTransactions(prev => [tx, ...prev]);
await fetchBalance(); // ✅ instantly update balance
alert("Transaction successful!");

    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };



  return (
    <TransactionContext.Provider
      value={{
        transactions,
        balance,
        loading,
        
        sendMoney,
        error,
        fetchBalance,
        fetchTransactions,
        fundWallet,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

// ✅ Custom hook
export const UseTransaction = () => useContext(TransactionContext);
export default TransactionContext;
