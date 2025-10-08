import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // ✅ Initialize user and token from localStorage
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // ---------------- REGISTER ----------------
  const register = async (formData) => {
    const { firstname, lastname, email, password, dob, gender, phone } = formData;
    const newUser = {
      firstname: firstname.trim(),
      lastname: lastname.trim(),
      email: email.trim().toLowerCase(),
      password,
      dob,
      gender,
      phone,
    };

    try {
      setLoading(true);
      setError(null);

      const response = await axios.post("http://localhost:3000/api/auth/register", newUser);

      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);
      setToken(response.data.token);

      navigate("/DashboardHome");
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- LOGIN ----------------
  const login = async (identifier, password) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post("http://localhost:3000/api/auth/login", {
        identifier,
        password,
      });

      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);
      setToken(response.data.token);

      navigate("/DashboardHome");
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- LOGOUT ----------------
  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/Login");
  };

  // ---------------- FORGOT PASSWORD ----------------
  const forgetPassword = async (identifier) => {
    try {
      setLoading(true);
      setError(null);

      if (!identifier) {
        alert("Please enter your email or phone number");
        return;
      }

      const res = await axios.post("http://localhost:3000/api/auth/forgot-password", { identifier });

      alert(res.data.message || "Reset code sent successfully!");
      navigate("/Verifycode", { state: { identifier } });
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- VERIFY CODE ----------------
  const verifyCode = async (identifier, code) => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.post("http://localhost:3000/api/auth/verify-code", {
        identifier,
        code: code.trim(),
      });

      alert(res.data.message || "Code verified successfully!");
      navigate("/ResetPassword", { state: { identifier, code: code.trim() } });
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- RESET PASSWORD ----------------
  const resetPassword = async ({ identifier, code, newPassword }) => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.post("http://localhost:3000/api/auth/reset-password", {
        identifier,
        code,
        newPassword,
      });

      if (user && (user.email === identifier || user.phone === identifier)) {
        const updatedUser = { ...user, password: newPassword };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }

      alert(res.data.message || "Password reset successfully!");
      navigate("/SuccessPage");
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- CHANGE PASSWORD ----------------
  const changePassword = ({ oldpassword, newpassword }) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      alert("No user found.");
      return;
    }

    if (storedUser.password === oldpassword) {
      storedUser.password = newpassword;
      localStorage.setItem("user", JSON.stringify(storedUser));
      setUser(storedUser);
      alert("Password changed successfully ✅");
      navigate("/SuccessPage");
    } else {
      alert("Old password is incorrect. Try again or use Forget Password.");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token, // ✅ <-- make sure this is included
        error,
        loading,
        verifyCode,
        register,
        login,
        logout,
        forgetPassword,
        changePassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook
export const UseAuth = () => useContext(AuthContext);
