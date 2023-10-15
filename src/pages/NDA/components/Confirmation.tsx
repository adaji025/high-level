import { Modal, Title, TextInput, Box, Button } from "@mantine/core";

type Props = {
  opened: boolean;
  close: () => void;
};
const Confirmation = ({ opened, close }: Props) => {
  return (
    <Modal
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      centered
      opened={opened}
      onClose={close}
    >
      <Title order={2} ta="center">
        Please enter an email for
        <span className="text-[#00D8D8]"> sending</span> NDA
      </Title>

      <TextInput
        size="md"
        mt={40}
        label="Email"
        placeholder="adaji@gmail.com"
      />
      <Box mt={20}>
        <div className="flex justify-center items-center gap-2 font-semibold p-2 border border-[#00D8D8]">
          <span className="text-[#00D8D8]">+</span>
          <span className="text-black">Add new Recepients</span>
        </div>
      </Box>
      <Button
        size="md"
        mt={70}
        className="bg-[#00D8D8] w-full rounded-lg font-semibold text-white"
      >
        Send for signi
      </Button>
    </Modal>
  );
};

export default Confirmation;
