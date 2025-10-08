import { useState } from "react";
import { UseTransaction } from "../Context/TransactionContext";
import myimage from "/assets/myimage.png";

function SendMoney() {
  const { sendMoney, loading } = UseTransaction();
  const [recipientAccount, setRecipientAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass recipientAccount as it’s called in context/backend
    sendMoney(recipientAccount, parseFloat(amount), note);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-4 bg-white rounded shadow-md"
    >
      <img
        src={myimage}
        alt="Send Money"
        className="w-20 h-20 mx-auto mb-4 rounded-full"
      />
      <input
        type="text"
        placeholder="Recipient Account Number"
        value={recipientAccount}
        onChange={(e) => setRecipientAccount(e.target.value)}
        className="w-full p-2 mb-3 border rounded"
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 mb-3 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Note (optional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full p-2 mb-3 border rounded"
      />
      <button
        type="submit"
        className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Sending..." : "Send Money"}
      </button>
    </form>
  );
}

export default SendMoney;
