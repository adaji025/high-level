import { FaBars } from "react-icons/fa";

type Props = {
  mobileNav: boolean;
  openMobileNav: React.Dispatch<React.SetStateAction<boolean>>;
};
const Header = ({ mobileNav, openMobileNav }: Props) => {
  return (
    <div className="lg:hidden bg-white fixed top-0 left-0 w-full z-50">
      {!mobileNav && (
        <div
          className="cursor-pointer flex justify-end items-center h-[80px] pr-5 border-b"
          onClick={() => openMobileNav(true)}
        >
          <FaBars color="#157145" size={24} />
        </div>
      )}
    </div>
  );
};

export default Header;
