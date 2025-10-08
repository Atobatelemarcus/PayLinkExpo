import { useState } from "react";
import { useLocation } from "react-router-dom";
import { UseAuth } from "../Context/AuthContext";

export default function ResetPassword() {
  const location = useLocation();
  const { identifier, code } = location.state || {};
  const { resetPassword } = UseAuth();

  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPassword({ identifier, code, newPassword });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Reset Password</h2>
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className=" border border-blue-600 mb-2  w-full px-4 py-2 rounded-lg"
      />
      <button type="submit" className="px-4 py-2 rounded-lg text-white bg-blue-800 hover:bg-green-600">Reset Password</button>
    </form>
  );
}
