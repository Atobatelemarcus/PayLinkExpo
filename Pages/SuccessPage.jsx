import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function SuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Animated Circle with Checkmark */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="w-32 h-32 rounded-full bg-blue-500 flex items-center justify-center shadow-xl"
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={3}
          stroke="white"
          className="w-16 h-16"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </motion.svg>
      </motion.div>

      {/* Success Message */}
      <motion.h1
        className="mt-6 text-2xl font-bold text-blue-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Password Changed Successfully 🎉
      </motion.h1>

      {/* Go back button */}
      <motion.button
        onClick={() => navigate("/Login")}
        className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-xl shadow-md hover:bg-green-700 transition"
        whileTap={{ scale: 0.9 }}
      >
        Back to Login
      </motion.button>
    </div>
  );
}
