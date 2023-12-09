import { Fragment, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar";
import Dashboard from "../../pages/Dashboard/Dashboard";
import MobileSidebar from "./MobileSidebar";
import Profile from "../../pages/Profile/Profile";
import EnvironmentManagement from "../../pages/EnvironmentManagement/Environment";
import UserManagement from "../../pages/UserManagement/Usermanagement";
import EnvironmentDetails from "../../pages/EnvironmentManagement/EnvironmentDetails";
import CreateAutomation from "../../pages/EnvironmentManagement/CreateAutomation";
import Header from "./Header";
import EditAutomation from "../../pages/EnvironmentManagement/EditAutomation";
import { useDisclosure } from "@mantine/hooks";
import AddCredentials from "./AddCredentials";
import { getUserCredentialsStatus } from "../../services/user";

const LoggedInContainer = () => {
  const [mobileNav, openMobileNav] = useState(false);
  const [credentialsStatus, setCredentialsStatus] = useState(true);
  const [_, { open, close }] = useDisclosure(true);

  console.log(credentialsStatus);

  useEffect(() => {
    handleGetUserCredentials();
    credentialsStatus && close();
  }, []);

  const handleGetUserCredentials = () => {
    getUserCredentialsStatus().then((res: any) => {
      setCredentialsStatus(res.data.status);
    });
  };

  return (
    <Fragment>
      <AddCredentials opened={!credentialsStatus} close={open} />
      <MobileSidebar {...{ mobileNav, openMobileNav }} />
      <div className="flex overflow-x-hidden">
        <div className="fixed h-screen hidden lg:flex lg:w-[300px]  bg-darkBlue p-[22px]">
          <Sidebar />
        </div>
        <div className="w-full">
          <Header mobileNav={mobileNav} openMobileNav={openMobileNav} />
          <main className="w-full bg-white pt-5 lg:pt-[50px] lg:ml-[300px] lg:w-[calc(100vw-300px)] px-4 lg:px-10 mb-10 mt-[80px] lg:mt-[unset]">
            <Routes>
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
                path="/manage-environment/create-automation/:id"
                element={<CreateAutomation />}
              />
              <Route
                path="/manage-environment/edit-automation/:id"
                element={<EditAutomation />}
              />
            </Routes>
          </main>
        </div>
      </div>
    </Fragment>
  );
};

export default LoggedInContainer;
