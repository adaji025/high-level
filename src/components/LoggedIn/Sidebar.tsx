import { Avatar, Text, LoadingOverlay } from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { DashboardIcon, GlobeIcon } from "../Svgs";
import { PiUserBold } from "react-icons/pi";
import useNotification from "../../hooks/useNotification";
import GoHighLevel from "../../assets/svgs/high-level-dark.svg";
import { useEffect, useState, Fragment } from "react";
import { getUser } from "../../services/user";
import { UserTypes } from "../../types/user";
import { useDisclosure } from "@mantine/hooks";
import ConfirmLogout from "./ConfirmLogout";

type Props = {
  openMobileNav?: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({ openMobileNav }: Props) => {
  const [users, setUsers] = useState<UserTypes | null>(null);
  const [loading, setLoading] = useState(false);
  const [routes, setRoutes] = useState<any[]>([]);
  const [opened, { open, close }] = useDisclosure(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { handleError } = useNotification();

  useEffect(() => {
    users?.is_admin ? setRoutes(adminRoutes) : setRoutes(usersRoutes);
  }, [users]);

  const usersRoutes = [
    {
      title: "Dashboard",
      icon: <DashboardIcon />,
      route: "/dashboard",
    },
    {
      title: "Profile Page",
      icon: <FaRegUser />,
      route: "/profile",
    },
    {
      title: "Manage Environments",
      icon: <GlobeIcon />,
      route: "/manage-environment",
    },
  ];
  const adminRoutes = [
    {
      title: "Dashboard",
      icon: <DashboardIcon />,
      route: "/dashboard",
    },
    {
      title: "User management",
      icon: <PiUserBold />,
      route: "/manage-user",
    },
    {
      title: "Profile Page",
      icon: <FaRegUser />,
      route: "/profile",
    },
    {
      title: "Manage Environments",
      icon: <GlobeIcon />,
      route: "/manage-environment",
    },
  ];

  useEffect(() => {
    handleGetUser();
  }, []);

  const handleGetUser = () => {
    setLoading(true);

    getUser()
      .then((res: any) => {
        setUsers(res.data);
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Fragment>
      <ConfirmLogout close={close} opened={opened} />
      <LoadingOverlay visible={loading} />
      <aside className="sidebar flex w-full h-full flex-col justify-between">
        <div className="w-full">
          <img src={GoHighLevel} alt="" />

          <div className="mt-14 grid gap-5 text-sm sm:text-base">
            {routes.map((route: any, index: number) => (
              <div
                key={index}
                className={`flex cursor-pointer gap-3  items-center px-3 py-2  rounded-lg ${
                  location.pathname === route.route
                    ? "bg-white text-darkBlue"
                    : "text-white"
                }`}
                onClick={() => {
                  navigate(route.route);
                  openMobileNav && openMobileNav(false);
                }}
              >
                <div
                  className={`${
                    location.pathname === route.route && "text-highLevelRed"
                  }`}
                >
                  {route.icon}
                </div>
                <div className="font-semibold">{route.title}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-5 text-sm sm:text-base">
          {/* <div
          className={`flex gap-3 cursor-pointer w-full text-white items-center px-3 py-2  rounded-lg ${
            location.pathname === "/settings" && "bg-[#00D8D8]"
          }`}
          onClick={() => {
            navigate("/settings");
            openMobileNav && openMobileNav(false);
          }}
        >
          <FiSettings size={24} />
          <div className="font-semibold">Settings</div>
        </div>
        <div
          className={`flex gap-3 cursor-pointer w-full text-white items-center px-3 py-2  rounded-lg ${
            location.pathname === "/support" && "bg-[#00D8D8]"
          }`}
          onClick={() => {
            navigate("/support");
            openMobileNav && openMobileNav(false);
          }}
        >
          <SupportIcon />
          <div className="font-semibold">Support</div>
        </div> */}

          <div className="flex items-center justify-between border-t w-full pt-3">
            <div className="flex gap-2">
              <Avatar color="cyan" radius="xl">
                MK
              </Avatar>
              <div className="text-white text-xs sm:text-sm">
                <Text fw={600}>
                  {users?.first_name} {users?.last_name}
                </Text>
                <Text>{users?.email}</Text>
              </div>
            </div>
            <BiLogOut
              size={30}
              color="white"
              className="rotate-180 cursor-pointer"
              onClick={open}
            />
          </div>
        </div>
      </aside>
    </Fragment>
  );
};

export default Sidebar;
