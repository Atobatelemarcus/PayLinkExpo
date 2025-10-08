import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { AuthProvider } from "../Context/AuthContext";
import { TransactionProvider } from "../Context/TransactionContext";
import Loader from "../components/Loader";

// Layouts
import AuthLayout from "../Layout/AuthLayout";
import DashboardLayout from "../Layout/DashboardLayout";

// Pages
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import PaymentPin from "../Pages/PaymentPin";
import Forgetpass from "../Pages/Forgetpass";
import InputPass from "../Pages/InputPass";
import Register from "../Pages/Register";
import DashboardHome from "../Pages/DashboardHome";
import Profile from "../Pages/Profile";
import DataAirtime from "../Pages/DataAirtime";
import Settings from "../Pages/Settings";
import Security from "../Pages/Security";
import SuccessPage from "../Pages/SuccessPage";
import Verifycode from "../Pages/Verifycode";
import ResetPassword from "../Pages/ResetPassword";
import ProtectedRoute from "../components/ProtectedRoute";
import SendMoney from "../Pages/SendMoney";
import ResetPin from "../Pages/ResetPin";
import Verifypin from "../components/Verifypin";
import CreatePin from "../Pages/CreatePin";
import History from "../Pages/History";
import Changepass from "../Pages/Changepass";
import Toast from "../components/Toast";
import FundAccount from "../Pages/Fundaccount";
// Protected Route


function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader onFinish={() => setLoading(false)} />;

  return (
    <AuthProvider>
       <TransactionProvider>
  <AnimatePresence mode="wait">
    <Routes location={location} key={location.pathname}>

      {/* Landing */}
      <Route path="/" element={<Home />} />

      {/* Auth */}
      <Route element={<AuthLayout />}>
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/SuccessPage" element={<SuccessPage/>}/>
        <Route path="/Verifycode" element={<Verifycode/>}/>
         <Route path="/Forgetpass" element={<Forgetpass/>}/>
         <Route path="/ResetPassword" element={<ResetPassword/>}/>
      </Route>

      {/* Dashboard */}
      <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route path="/DashboardHome" element={<DashboardHome />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Settings" element={<Settings />} />
        <Route path="/DataAirtime" element={<DataAirtime />} />
        <Route path="/Security" element={<Security/>}/>
       
        <Route path="/InputPass" element={<InputPass/>}/>
        <Route path="/PaymentPin" element={<PaymentPin/>}/>
         <Route path="/Verifypin" element={<Verifypin/>}/>
         <Route path="/ResetPin" element={<ResetPin/>}/>
        <Route path="/CreatePin" element={<CreatePin/>}/>
        <Route path="/SendMoney" element={<SendMoney/>}/>
        <Route path="/History" element={<History/>}/>
        <Route path="/Changepass" element={<Changepass/>}/>
        <Route path="/Toast" element={<Toast/>}/>
        <Route path="/Fundaccount" element={<FundAccount />} />

       
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  </AnimatePresence>
  </TransactionProvider>
</AuthProvider>

  );
}

export default App;
