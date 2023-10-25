import { FaTimes } from "react-icons/fa";
import Sidebar from "./Sidebar";
import { useMediaQuery } from "@mantine/hooks";

type Props = {
  mobileNav: boolean;
  openMobileNav: React.Dispatch<React.SetStateAction<boolean>>;
};
const MobileSidebar = ({ openMobileNav, mobileNav }: Props) => {
  const breakPoint = useMediaQuery("(max-width: 1024px)");

  return (
    <div
      className={`fixed bg-black/10 z-[1000]  transition-all duration-300  ${
        mobileNav ? "left-0 w-full" : "left-[-1000px] w-0"
      } ${breakPoint ? "z-[1000] h-screen" : "z-[-1] h-0"}`}
    >
      <div className="w-4/5 sm:w-1/2 bg-darkBlue h-full lg:hidden p-[22px]">
        <Sidebar openMobileNav={openMobileNav} />
      </div>
      <div onClick={() => openMobileNav(false)}>
        <FaTimes
          size={30}
          color="#002500"
          className="absolute right-3 top-6 sm:right-6 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default MobileSidebar;
