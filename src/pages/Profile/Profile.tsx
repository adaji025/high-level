import { TextInput } from "@mantine/core";
import { Fragment } from "react";
import { CiSearch } from "react-icons/ci";
import ProfileDetails from "./components/ProfileDetails";
import Password from "./components/Password";
import { useState } from "react";

const Profile = () => {
  const [active, setActive] = useState("details");

  return (
    <Fragment>
      <div>
        <div className="flex justify-between">
          <h2 className="font-bold text-3xl">Settings</h2>
          <TextInput
            size="md"
            leftSection={<CiSearch size={24} />}
            placeholder="Search"
          />
        </div>

        <div className="mt-10 flex gap-5">
          <div
            className={`rounded-md cursor-pointer py-2 px-3 text-sm font-bold ${
              active === "details"
                ? "bg-[#E5F3FB] text-darkBlue"
                : "text-secondaryText"
            }`}
            onClick={() => setActive("details")}
          >
            My details
          </div>
          <div
            className={`rounded-md cursor-pointer py-2 px-3 text-sm ${
              active === "pw"
                ? "bg-[#E5F3FB] font-semibold text-secondaryText"
                : "font-medium"
            }`}
            onClick={() => setActive("pw")}
          >
            My details
          </div>
        </div>

        <div className="mt-14">
          {active === "details" && <ProfileDetails />}
          {active === "pw" && <Password />}
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
