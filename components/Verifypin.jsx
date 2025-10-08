import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Verifypin() {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // ✅ Normally: verify with backend
    if (code === "123456") { // fake demo OTP
      navigate("/ResetPin");
    } else {
      alert("Invalid code");
    }
  };

  return (
    <section className="flex flex-col items-center mt-10">
      <h2 className="text-lg font-bold">Enter Verification Code</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="password"
          placeholder="Enter code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="border px-4 py-2 rounded-md"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2"
        >
          Verify
        </button>
      </form>
    </section>
  );
}

export default Verifypin;
