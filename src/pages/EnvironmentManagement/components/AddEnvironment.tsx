import { Modal, Title, TextInput, Button } from "@mantine/core";

type Props = {
  opened: boolean;
  close: () => void;
};

const AddEnvironment = ({ close, opened }: Props) => {
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
      <Title order={3} ta="center">
        Add New Environment
      </Title>
      <TextInput mt={24} label="Agency Name" placeholder="Enter Agency name" />
      <TextInput mt={24} label="API Key" placeholder="Enter API key" />
      <Button my={32} size="lg" className="bg-highLevelRed w-full">
        Add
      </Button>
    </Modal>
  );
};

export default AddEnvironment;
