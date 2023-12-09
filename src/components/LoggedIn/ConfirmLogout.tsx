import { Modal, Button, Divider, Text } from "@mantine/core";
import useNotification from "../../hooks/useNotification";

type Props = {
  opened: boolean;
  close: () => void;
};

const ConfirmLogout = ({ close, opened }: Props) => {
  const { logoutUser } = useNotification();

  return (
    <Modal centered opened={opened} onClose={close} title={<Text fw={900}>Log Out</Text>}>
      <Divider mb={16} />
      <div className="text-lg font-medium">
        Are you sure you want to log out?
      </div>
      <div className="flex gap-5 mb-5 mt-5 justify-center">
        <Button variant="outline" className="w-1/2" onClick={close}>
          Cancel
        </Button>
        <Button className="bg-darkBlue flex-1" onClick={logoutUser}>
          Log Out
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmLogout;
