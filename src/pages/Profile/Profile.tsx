import { Avatar, Box, Text, TextInput, Divider, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { CiMail } from "react-icons/ci";
import Hannah from "../../assets/images/hannah.png";
import UpdatePassword from "./UpdatePassword";

const Profile = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div>
      <UpdatePassword close={close} opened={opened} />
      <div className="auth h-[40vh] flex justify-center items-center">
        <div className="text-center mx-auto">
          <Avatar
            variant="filled"
            radius="xl"
            size="xl"
            src={Hannah}
            className="mx-auto rounded-full"
          />
          <h2 className="font-semibold mt-2">Adaji Mukhtar</h2>
          <div className="text-xs">adaji@gmail.com</div>
        </div>
      </div>
      <Box mt={40}>
        <h2 className="text-2xl font-bold text-[#101828]">
          Personal information
        </h2>
        <Text mt={4} size="sm">
          Please enter your personal information or change the existing one.
        </Text>

        <div className="xl:w-4/5 flex flex-col sm:flex-row gap-10 mt-10">
          <div className="w-full sm:w-2/5 font-medium text-xl">Full name</div>
          <div className="flex-1">
            <TextInput size="md" placeholder="Olivia Rhye" />
          </div>
        </div>

        <Divider mt={40} />

        <div className="xl:w-4/5 flex gap-10 mt-10">
          <div className="w-2/5 font-medium text-xl">
            <div>Photo</div>
            <Text mt={4} size="xs">
              This will be displayed on your profile.
            </Text>
          </div>
          <div className="">
            <Avatar
              variant="filled"
              radius="xl"
              size="lg"
              src={Hannah}
              className="mx-auto rounded-full"
            />
          </div>
        </div>

        <Divider mt={40} />
        <div className="xl:w-4/5 flex  flex-col sm:flex-row gap-10 mt-10">
          <div className="w-full sm:w-2/5 font-medium text-xl">
            <div>Alternative contact email</div>
            <Text mt={4} size="xs">
              Enter an alternative email if you’d like to be contacted via a
              different email.
            </Text>
          </div>
          <div className="flex-1">
            <TextInput
              leftSection={<CiMail />}
              size="md"
              placeholder="Olivia Rhye"
            />
          </div>
        </div>
        <Button
          onClick={open}
          size="md"
          mt={40}
          className="text-white bg-red-500"
        >
          Change Password
        </Button>
        <Divider my={40} />

        <div className="flex gap-3 font-semibold text-black hover:text-black/70 justify-end pb-10">
          <button className="">Cancel</button>
          <button className="bg-[#00D8D8] w-[130px] p-3 rounded-lg font-semibold text-white">
            Update
          </button>
        </div>
      </Box>
    </div>
  );
};

export default Profile;
