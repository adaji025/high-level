import { TextInput, LoadingOverlay } from "@mantine/core";
import { Fragment } from "react";
import { CiSearch } from "react-icons/ci";
import ProfileDetails from "./components/ProfileDetails";
import Password from "./components/Password";
import { useEffect, useState } from "react";
import { getUser } from "../../services/user";
import useNotification from "../../hooks/useNotification";
import { UserTypes } from "../../types/user";

const Profile = () => {
  const [active, setActive] = useState("details");
  const [user, setUser] = useState<UserTypes | null>(null);
  const [loading, setLoading] = useState(false);
  const { handleError } = useNotification();

  useEffect(() => {
    handleGetUser();
  }, []);

  const handleGetUser = () => {
    setLoading(true);

    getUser()
      .then((res: any) => {
        setUser(res.data);
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
      <LoadingOverlay visible={loading} />
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
          {active === "details" && (
            <ProfileDetails user={user} handleGetUser={handleGetUser} />
          )}
          {active === "pw" && <Password />}
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
