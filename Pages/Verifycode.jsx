import { useState } from "react";
import { useLocation } from "react-router-dom";
import { UseAuth } from "../Context/AuthContext";
import Toast from "../components/Toast";

export default function VerifyCode() {
  const location = useLocation();
  const identifier = location.state?.identifier;
  const { verifyCode } = UseAuth();

  const [code, setCode] = useState("");
  const [toast,setToast]= useState(null)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!identifier) {
      
     setToast({
        message:"Identifier missing! Go back and enter your email or phone.",
        type:"error"
      })
       return;
    }
    verifyCode(identifier, code);
  };

  return (
     <>
    <form onSubmit={handleSubmit}>
      <h2 className="text-lg text-blue-800 mb-2 text-center">Verify Code</h2>
      <input
        type="text"
        placeholder="Enter code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className=" border border-blue-600 mb-2  w-full px-4 py-2 rounded-lg"
      />
      <button type="submit" className="px-4 py-2 rounded-lg text-white bg-blue-800 hover:bg-green-600">Verify Code</button>
    </form>
    {toast&&(
      < Toast
      message={toast.message}
      type={toast.type}
      onClose={()=>setToast(null)}/>
    )}
   </>
  );
}
