import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import myimage from "/assets/myimage.png";

export default function Loader() {
  const [text, setText] = useState("");
  const fullText = "Paylink Africa";

  // Typing effect
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(interval);
    }, 150); // typing speed
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <motion.div
        className="text-center"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Pulsating Circle */}
        <motion.img
        src={myimage}
          className="w-20 h-20 rounded-full bg-blue-500 mx-auto mb-6"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />

        {/* Typing Text */}
        <h1 className="text-3xl font-bold tracking-wide text-blue-800">
          {text}
          <span className="animate-pulse">.</span>
        </h1>
      </motion.div>
    </div>
  );
}
