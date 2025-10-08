import { Navigate } from "react-router-dom";
import { UseAuth } from "../Context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = UseAuth();

  if (!user) return <Navigate to="/Login" replace />;
  return children;
};

export default ProtectedRoute;
