import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { ToastContainer, } from 'react-toastify';
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/Auth/SignIn";
import LoggedInContainer from "./components/LoggedInContainer";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";



export default function App() {
  // const loggedIn = useSelector((state: RootState) => state.user.loggedIn)

  const token = localStorage.getItem("high_level_token");

  return (
    <MantineProvider
      theme={{
        primaryColor: "gray",
        fontFamily: "Poppins, sans-serif",
        defaultRadius: 8,
      }}
    >
      <ToastContainer />
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/*" element={token ? <LoggedInContainer /> : <SignIn />} />
      </Routes>
    </MantineProvider>
  );
}
