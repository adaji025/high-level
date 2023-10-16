import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { LoadingOverlay } from "@mantine/core";
import { FaBars } from "react-icons/fa";
import Sidebar from "./Sidebar";
import Dashboard from "../../pages/Dashboard/Dashboard";
import MobileSidebar from "./MobileSidebar";
import Profile from "../../pages/Profile/Profile";
import { getProfile } from "../../services/user";
import useNotification from "../../hooks/useNotification";
import EnvironmentManagement from "../../pages/EnvironmentManagement/Environment";
import UserManagement from "../../pages/UserManagement/Usermanagement";

const LoggedInContainer = () => {
  const [mobileNav, openMobileNav] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState([]);

  const { handleError } = useNotification();

  useEffect(() => {
    handleGetProfile();
  }, []);

  const handleGetProfile = () => {
    setLoading(true);
    getProfile()
      .then((res: any) => {
        setProfile(res.data.data.data);
      })
      .then((error) => {
        handleError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const ProfileDetails = profile[0];
  console.log(ProfileDetails);
  return (
    <>
      <MobileSidebar {...{ mobileNav, openMobileNav }} />
      <LoadingOverlay visible={loading} />
      <div className="flex overflow-x-hidden">
        <div className="fixed h-screen hidden lg:flex lg:w-[300px]  bg-darkBlue p-[22px]">
          <Sidebar />
        </div>
        <div className="w-full mt-10">
          <main className="w-full bg-white pt-[50px] lg:ml-[300px] lg:w-[calc(100vw-300px)] px-4 lg:px-10 mb-10">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/manage-environment" element={<EnvironmentManagement />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/manage-user" element={<UserManagement />} />
            </Routes>
          </main>
        </div>
      </div>

      {!mobileNav && (
        <div
          className="cursor-pointer lg:hidden fixed top-10 right-10 bg-white p-4"
          onClick={() => openMobileNav(true)}
        >
          <FaBars color="#157145" size={24} />
        </div>
      )}
    </>
  );
};

export default LoggedInContainer;
