import { createContext, useContext, useState, useEffect } from "react";
import { UseAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const Transact = createContext();

export const TransactProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]); 
  const [pin, setPin] = useState(() => {
    // Load saved pin from localStorage (if any)
    const storedUser = JSON.parse(localStorage.getItem("user"));
    return storedUser?.pin || "";
  });

  const { user } = UseAuth();
  const navigate = useNavigate();

  // ✅ Save pin to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      const storedUser = JSON.parse(localStorage.getItem("user")) || {};
      storedUser.pin = pin;
      localStorage.setItem("user", JSON.stringify(storedUser));
    }
  }, [pin, user]);

  // Forget pin
  const forgetPin = (identifier) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) return alert("No user found. Please register first.");

    if (user?.email === identifier || user?.phone === identifier) {
      alert("Identifier verified ✅. You can now set a new pin.");
      navigate("/Verifypin");
    } else {
      alert("Enter a correct email or phone number");
    }
  };

  // Reset pin
  const ResetPin = ({ newPin }) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setPin(newPin); // state + effect will update localStorage
      alert("Pin reset successfully!");
      navigate("/SuccessPage");
    } else {
      alert("No user found in system.");
    }
  };

  // Create pin
  const createpin = (newPin) => {
    if (!user) return alert("No user found. Please register first.");
    if (newPin.length !== 6 || isNaN(newPin)) {
      return alert("Pin must be exactly 6 digits");
    }
    setPin(newPin); // ✅ saved via useEffect
    console.log("Pin set:", newPin);
    alert("Pin created successfully");
  };

  // Add a new transaction
  const addTransaction = ({ recipient, amount, note, pin }) => {
    const newTransaction = {
      id: Date.now(),
      recipient,
      amount,
      note,
      date: new Date().toLocaleString(),
      status: "success",
      pin,
    };
    setTransactions((prev) => [newTransaction, ...prev]);
    console.log("Transaction added:", newTransaction);
    return newTransaction;
  };

  const updateTransactionStatus = (id, status) => {
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === id ? { ...tx, status } : tx))
    );
  };

  const getTransactions = () => transactions;

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        updateTransactionStatus,
        getTransactions,
        forgetPin,
        ResetPin,
        createpin,
        pin, // ✅ always available across refresh
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const UseTransaction = () => useContext(Transact);
export default Transact;