import { Modal, Text, PasswordInput, Divider, Button } from "@mantine/core";

type Props = {
  opened: boolean;
  close: () => void;
};
const UpdatePassword = ({ opened, close }: Props) => {
  return (
    <Modal
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      opened={opened}
      onClose={close}
      title={
        <Text size="lg" fw={600}>
          Reset Password
        </Text>
      }
    >
      <Text fw={400} size="xs">
        Please enter your current password to change your password.
      </Text>

      <PasswordInput
        mt={20}
        size="md"
        label="Current password"
        placeholder="********"
      />
      <PasswordInput
        mt={20}
        size="md"
        label="New password"
        placeholder="********"
      />
      <PasswordInput
        mt={20}
        size="md"
        label="Confirm new password"
        placeholder="********"
      />

      <Divider my={26} />
      <div className="flex justify-end">
        <Button
          size="md"
          className="bg-[#00D8D8] rounded-lg font-semibold text-white"
        >
          Reset Password
        </Button>
      </div>
    </Modal>
  );
};

export default UpdatePassword;
