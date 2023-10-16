import { Modal, Title, TextInput, Button } from "@mantine/core";

type Props = {
  opened: boolean;
  close: () => void;
};

const AddUser = ({ close, opened }: Props) => {
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
        Enter user info
      </Title>
      <TextInput mt={24} label="Full name" placeholder="Example name" />
      <TextInput
        type="email"
        mt={24}
        label="Email"
        placeholder="example@gmail.com"
      />
      <Button my={32} size="lg" className="bg-highLevelRed w-full">
        Add new User
      </Button>
    </Modal>
  );
};

export default AddUser;
