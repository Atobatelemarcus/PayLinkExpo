import { useState } from "react";
import { Link } from "react-router-dom";
import { UseAuth } from "../Context/AuthContext";
import myimage from "/assets/myimage.png";

export default function Login() {
  const { login,loading,error } = UseAuth();
  const [formData, setFormData] = useState({ identifier: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData.identifier, formData.password);
    // optional: reset form
     
    setFormData({ identifier: "", password: "" });
   
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="w-full  p-8 space-y-6 bg-white shadow-lg rounded-lg">
        {/* Logo + Name */}
        <div className="flex flex-col items-center">
          <img
            src={myimage}
            alt="Paylink Logo"
            className="w-20 h-20 mb-2 rounded-full"
          />
          <h1 className="text-2xl font-bold text-blue-600">Paylink Africa</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="identifier"
            placeholder="Email or phone number"
            value={formData.identifier}
            onChange={handleChange}
            className="w-full p-3 border rounded-md border-gray-300 focus:ring focus:ring-blue-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-md border-gray-300 focus:ring focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full py-3 mt-4 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Logging in..." :"login"}
          </button>
          {error && <p className="text-red-500 text-center">{error}</p>}
           </form>

        <p className="text-center text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
        <p className="text-center text-gray-600">
          <Link to="/Forgetpass" className="text-green-600 hover:underline">
            forgot password?
          </Link>
        </p>
      </div>
    </div>
  );
}
