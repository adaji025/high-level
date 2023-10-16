import { Avatar, Button, Divider, TextInput } from "@mantine/core";
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
            {...form.getInputProps("lastt_name")}
            className="sm:w-1/2"
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
    </div>
  );
};

export default ProfileDetails;
