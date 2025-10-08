import { useState } from "react";
import { UseAuth } from "../Context/AuthContext";
import Toast from '../components/Toast';
import myimage from "/assets/myimage.png";

export default function Register() {
  const { register,loading } = UseAuth();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname:"",
    email: "",
    phone: "",
    password: "",
    dob: "",
    gender: ""
  });

  // Optional: state for validation messages
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    const { firstname, lastname,email, phone, password, dob, gender } = formData;
    if (!firstname||!lastname || !email || !phone || !password || !dob || !gender) {
    setError({
      message:"All fields are required!",
      type:"error"
    });
      return;
    }

    // Call register from context
    register(formData);

    // Optionally clear the form
    setFormData({
      firstname: "",
      lastname:"",
      email: "",
      phone: "",
      password: "",
      dob: "",
      gender: ""
    });

    
  };

  return (
<>
<div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
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
      <h2 className="text-xl font-bold mb-4">Register</h2>
 {error&&(
      < Toast
      message={error.message}
      type={error.type}
      onClose={()=>setError(null)}/>
    )}

      <input
        name="firstname"
        value={formData.firstname}
        onChange={handleChange}
        placeholder="First name"
        type="text"
        className="w-full px-6 py-3 border rounded-md border-gray-300 focus:ring focus:ring-blue-400"
      />
      <input
        name="lastname"
        value={formData.lastname}
        onChange={handleChange}
        placeholder="Last name"
        type="text"
        className="w-full px-6 py-3 border rounded-md border-gray-300 focus:ring focus:ring-blue-400"
      />

      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        type="email"
        className="w-full px-6 py-3 border rounded-md border-gray-300 focus:ring focus:ring-blue-400"
      />

      <input
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone Number"
        type="tel"
        className="w-full px-6 py-3 border rounded-md border-gray-300 focus:ring focus:ring-blue-400"
      />

      <input
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        type="password"
        className="w-full px-6 py-3 border rounded-md border-gray-300 focus:ring focus:ring-blue-400"
      />

      <input
        name="dob"
        value={formData.dob}
        onChange={handleChange}
        placeholder="Date of Birth"
        type="date"
        className="w-full px-6 py-3 border rounded-md border-gray-300 focus:ring focus:ring-blue-400"
      />

      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        className="w-full px-6 py-3 border rounded-md border-gray-300 focus:ring focus:ring-blue-400"
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-green-600 w-full border border-gray-300 focus:ring focus:ring-blue-400"
      >
       {loading ? "Logging in..." :"login"}
      </button>
    </form>
        </div>
        
  </div>
  </>










   
  );
}
