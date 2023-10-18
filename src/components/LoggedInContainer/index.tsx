import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import Sidebar from "./Sidebar";
import Dashboard from "../../pages/Dashboard/Dashboard";
import MobileSidebar from "./MobileSidebar";
import Profile from "../../pages/Profile/Profile";
import EnvironmentManagement from "../../pages/EnvironmentManagement/Environment";
import UserManagement from "../../pages/UserManagement/Usermanagement";
import EnvironmentDetails from "../../pages/EnvironmentManagement/EnvironmentDetails";
import CreateAutomation from "../../pages/EnvironmentManagement/CreateAutomation";

const LoggedInContainer = () => {
  const [mobileNav, openMobileNav] = useState(false);

  return (
    <>
      <MobileSidebar {...{ mobileNav, openMobileNav }} />
      <div className="flex overflow-x-hidden">
        <div className="fixed h-screen hidden lg:flex lg:w-[300px]  bg-darkBlue p-[22px]">
          <Sidebar />
        </div>
        <div className="w-full">
          <main className="w-full bg-white pt-[50px] lg:ml-[300px] lg:w-[calc(100vw-300px)] px-4 lg:px-10 mb-10">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route
                path="/manage-environment"
                element={<EnvironmentManagement />}
              />
              <Route path="/profile" element={<Profile />} />
              <Route path="/manage-user" element={<UserManagement />} />
              <Route
                path="/manage-environment/:id"
                element={<EnvironmentDetails />}
              />
              <Route
                path="/manage-environment/create-automation"
                element={<CreateAutomation />}
              />
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
