import { Avatar, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import Hannah from "../../../assets/images/hannah.png";
import { Upload } from "./Upload";

const ProfileDetails = () => {
  const form = useForm({
    initialValues: {
      first_name: "Mukhtar",
      last_name: "Adaji",
    },
  });
  return (
    <div>
      <div>
        <h2 className="font-semibold text-lg">My details</h2>
        <div className="text-sm text-secondaryText mt-2">
          Update your photo and personal details here.
        </div>
      </div>
      <div className="border rounded-xl mt-14 p-5">
        <div className="flex w-full gap-10">
          <TextInput
            size="md"
            label="First name"
            {...form.getInputProps("first_name")}
            className="w-1/2"
          />
          <TextInput
            size="md"
            label="Last name"
            {...form.getInputProps("lastt_name")}
            className="w-1/2"
          />
        </div>
        <div className="flex  justify-center items-center mt-5">
          <Avatar
            variant="filled"
            radius="xl"
            size="xl"
            src={Hannah}
            className="mx-auto rounded-full"
          />
        </div>
        <div className="mt-5">
          <Upload />
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
