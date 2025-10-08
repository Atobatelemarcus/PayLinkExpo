import { useNavigate } from "react-router-dom";
import myimage from "/assets/myimage.png";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center gap-2">
      {/* Logo */}
      <img
        src={myimage}// your image here
        alt="Paylink Africa"
        className="w-20 h-20 mb-6  rounded-full animate-pulse"
      />
      

      {/* Title */}
      <h1 className="text-xl font-bold text-blue-600 mb-2">
        Welcome to Paylink Africa
      </h1>
      <p className="text-gray-600 max-w-md mb-6">
        The easiest way to connect payments across Africa.  
        Fast. Secure. Reliable.
      </p>

      {/* Get Started Button */}
      <button
        onClick={() => navigate("/Login")}
        className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-blue-700 transition"
      >
        Get Started
      </button>
    </div>
  );
}
