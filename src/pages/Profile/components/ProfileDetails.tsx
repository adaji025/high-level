import {
  Avatar,
  Button,
  Divider,
  TextInput,
  LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Upload } from "./Upload";
import { updateProfile } from "../../../services/user";
import { toast } from "react-toastify";
import useNotification from "../../../hooks/useNotification";
import { useEffect, useState } from "react";
import { UserTypes } from "../../../types/user";

type Props = {
  user: UserTypes | null;
  handleGetUser: () => void;
};

const ProfileDetails = ({ user, handleGetUser }: Props) => {
  const { handleError } = useNotification();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
    },
  });


  useEffect(() => {
    form.setInitialValues({
      first_name: user ? user?.first_name : "",
      last_name: user ? user?.last_name : "",
      email: user ? user?.email : "",
    });
  }, []);

  const handleUpdateProfile = (values: any) => {
    setLoading(true);

    updateProfile(values)
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
      <form onSubmit={form.onSubmit((values) => handleUpdateProfile(values))}>
        <div className="border rounded-xl mt-14 p-5">
          <div className="flex flex-col sm:flex-row w-full gap-10">
            <TextInput
              size="lg"
              label="First name"
              {...form.getInputProps("first_name")}
              className="sm:w-1/2"
            />
            <TextInput
              size="lg"
              label="Last name"
              {...form.getInputProps("last_name")}
              className="sm:w-1/2"
            />
          </div>
          <div className="mt-5 w-full sm:w-1/2">
            <TextInput
              size="lg"
              label="Email"
              {...form.getInputProps("email")}
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
