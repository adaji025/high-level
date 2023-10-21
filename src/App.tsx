import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { ToastContainer } from "react-toastify";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import SignIn from "./pages/Auth/SignIn";
import LoggedInContainer from "./components/LoggedIn";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import { useEffect } from "react";

export default function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const token = localStorage.getItem("high_level_token");
  
  useEffect(() => {
    if (location.pathname === "/" && token) navigate("/dashboard");
  }, []);

  return (
    <MantineProvider
      theme={{
        primaryColor: "blue",
        fontFamily: "Poppins, sans-serif",
        defaultRadius: 8,
      }}
    >
      <ToastContainer />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/*" element={token ? <LoggedInContainer /> : <SignIn />} />
      </Routes>
    </MantineProvider>
  );
}
