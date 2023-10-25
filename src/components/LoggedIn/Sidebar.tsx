import { Avatar, Text } from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { DashboardIcon, GlobeIcon } from "../Svgs";
import { PiUserBold } from "react-icons/pi";
import useNotification from "../../hooks/useNotification";
import GoHighLevel from "../../assets/svgs/high-level-dark.svg";

type Props = {
  openMobileNav?: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({ openMobileNav }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { logoutUser } = useNotification();

  const users = [
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

  return (
    <aside className="sidebar flex w-full h-full flex-col justify-between">
      <div className="w-full">
        <img src={GoHighLevel} alt="" />

        <div className="mt-14 grid gap-5 text-sm sm:text-base">
          {users.map((route: any, index: number) => (
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
              <Text fw={600}>Olivia Rhye</Text>
              <Text>olivia@example.com</Text>
            </div>
          </div>
          <BiLogOut
            size={30}
            color="white"
            className="rotate-180 cursor-pointer"
            onClick={logoutUser}
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
