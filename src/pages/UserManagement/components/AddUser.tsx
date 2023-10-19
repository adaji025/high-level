import { Modal, Title, TextInput, Button, PasswordInput } from "@mantine/core";

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
      <TextInput mt={8} label="First name" placeholder="Example name" />
      <TextInput mt={8} label="Last name name" placeholder="Example name" />
      <TextInput
        type="email"
        mt={8}
        label="Email"
        placeholder="example@gmail.com"
      />
      <PasswordInput mt={8} label="Password" placeholder="********" />
      <Button my={32} size="lg" className="bg-highLevelRed w-full">
        Add new User
      </Button>
    </Modal>
  );
};

export default AddUser;
