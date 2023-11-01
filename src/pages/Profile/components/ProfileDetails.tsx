import {
  Avatar,
  Button,
  Divider,
  TextInput,
  LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Upload } from "./Upload";
import { getUser, updateProfile } from "../../../services/user";
import { toast } from "react-toastify";
import useNotification from "../../../hooks/useNotification";
import { useEffect, useState } from "react";
import { UserTypes } from "../../../types/user";

const ProfileDetails = () => {
  const { handleError } = useNotification();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserTypes | null>(null);
  const [first_name, setFirst_name] = useState(user?.first_name);
  const [last_name, setLast_name] = useState(user?.last_name);
  const [email, setEmail] = useState(user?.email);

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

  const form = useForm({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
    },
  });

  const handleUpdateProfile = () => {
    setLoading(true);

    const data = {
      first_name,
      last_name,
      email,
    };

    updateProfile(data)
      .then(() => {
        toast.success("Profile updated successfully");
        handleGetUser();
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div>
      <LoadingOverlay visible={loading} />
      <div>
        <h2 className="font-semibold text-lg">My details</h2>
        <div className="text-sm text-secondaryText mt-2">
          Update your photo and personal details here.
        </div>
      </div>
      <form onSubmit={form.onSubmit(handleUpdateProfile)}>
        <div className="border rounded-xl mt-14 p-5">
          <div className="flex flex-col sm:flex-row w-full gap-10">
            <TextInput
              size="lg"
              label="First name"
              className="sm:w-1/2"
              defaultValue={user?.first_name}
              onChange={(e) => setFirst_name(e.target.value)}
            />
            <TextInput
              size="lg"
              label="Last name"
              className="flex-1"
              defaultValue={user?.last_name}
              onChange={(e) => setLast_name(e.target.value)}
            />
          </div>
          <div className="mt-5 w-full sm:w-1/2">
            <TextInput
              size="lg"
              label="Email"
              defaultValue={user?.email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex  justify-center items-center mt-5">
            <Avatar
              variant="filled"
              radius="xl"
              size="xl"
              src={null}
              className="mx-auto rounded-full"
            />
          </div>
          <div className="mt-5">
            <Upload />
          </div>
        </div>

        <Divider mt={100} />
        <div className="flex mt-10 gap-3 font-semibold text-black hover:text-black/70 justify-end pb-10">
          <Button
            size="lg"
            variant="outline"
            className="font-semibold flex text-darkBlue border-darkBlue"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            size="lg"
            className="bg-darkBlue rounded-lg font-semibold text-white flex"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileDetails;
