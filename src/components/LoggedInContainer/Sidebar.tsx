import { Avatar, Text } from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";
import { ContractIcon, DashboardIcon, NDAIcon, SupportIcon } from "../Svgs";

type Props = {
  openMobileNav?: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({ openMobileNav, }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLOgout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  const users = [
    {
      title: "Dashboard",
      icon: <DashboardIcon />,
      route: "/dashboard",
    },
    {
      title: "NDA Creation",
      icon: <NDAIcon />,
      route: "/nda",
    },
    {
      title: "Profile",
      icon: <FaRegUser />,
      route: "/profile",
    },
    {
      title: "Contract managing",
      icon: <ContractIcon />,
      route: "/contract-management",
    },
  ];

  return (
    <aside className="sidebar flex w-full flex-col justify-between">
      <div className="w-full">
        <div className="p-2 text-center font-bold bg-white rounded-full w-[153px]">
          Logo
        </div>

        <div className="mt-14 grid gap-5">
          {users.map((route: any, index: number) => (
            <div
              key={index}
              className={`flex cursor-pointer gap-3 text-white items-center px-3 py-2  rounded-lg ${
                location.pathname === route.route && "bg-[#00D8D8]"
              }`}
              onClick={() => {
                navigate(route.route);
                openMobileNav && openMobileNav(false);
              }}
            >
              <NDAIcon />
              <div className="font-semibold">{route.title}</div>
            </div>
          ))}
          {/* <div
            className={`flex cursor-pointer gap-3 text-white items-center px-3 py-2  rounded-lg ${
              location.pathname === "/profile" && "bg-[#00D8D8]"
            }`}
            onClick={() => {
              navigate("/profile");
              openMobileNav && openMobileNav(false);
            }}
          >
            <FaRegUser />
            <div className="font-semibold">My Profile</div>
          </div>
          <div
            className={`flex cursor-pointer gap-3 text-white items-center px-3 py-2  rounded-lg ${
              location.pathname === "/contract-management" && "bg-[#00D8D8]"
            }`}
            onClick={() => {
              navigate("/contract-management");
              openMobileNav && openMobileNav(false);
            }}
          >
            <DashboardIcon />
            <div className="font-semibold">Contract managing</div>
          </div> */}
        </div>
      </div>

      <div className="mt-5 grid gap-5">
        <div
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
        </div>

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
            onClick={handleLOgout}
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
