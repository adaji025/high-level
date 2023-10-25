import { Modal, Title, Box, Button, LoadingOverlay } from "@mantine/core";
import { activateUser, deactivateUser, getUserList } from "../../../services/user";
import { UserState, UserTypes } from "../../../types/user";
import { toast } from "react-toastify";
import { Fragment, useState } from "react";
import useNotification from "../../../hooks/useNotification";

type Props = {
  opened: boolean;
  close: () => void;
  user: UserTypes | null;
  setUsers: React.Dispatch<React.SetStateAction<UserState | null>>
};

const ConfirmStatus = ({ close, opened, user, setUsers }: Props) => {
  const [loading, setLoading] = useState(false);

  const {handleError} = useNotification()
 

  const handleGetUsers = () => {
    setLoading(true);
    getUserList(1, 10)
      .then((res: any) => {
        console.log(res);
        setUsers(res.data);
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDeactivateUser = () => {
    setLoading(true);

    if (user)
      deactivateUser(user.id)
        .then(() => {
          toast.success(
            `User Deactivated sucessfully`
          );
          handleGetUsers();
          close();
        })
        .catch((error: any) => {
          toast.error(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
  };

  const handleActivateUser = () => {
    setLoading(true);

    if (user)
      activateUser(user.id)
        .then(() => {
          toast.success(
            `User Activated sucessfully`
          );
          handleGetUsers();
          close();
        })
        .catch((error: any) => {
          toast.error(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
  };
  return (
    <Fragment>
      <LoadingOverlay visible={loading} />
      <Modal
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        centered
        opened={opened}
        onClose={close}
      >
        <Title order={3} ta="center" className="text-darkBlue">
          Automation name
        </Title>
        <Box my={34} className="w-4/5 mx-auto">
          <div className="text-center font-bold text-xl mb-3">
            Are You sure you want to{" "}
            {user?.is_active ? "Deactivate" : "Activate"}{" "}
            <span className="text-darkBlue font-bold">
              {user?.first_name} {user?.last_name}
            </span>
          </div>
          <div className="w-full flex justify-center mt-10 gap-5">
            <Button variant="dark" className="bg-darkBlue" onClick={close}>
              NO
            </Button>
            <Button variant="outline" onClick={user?.is_active ? handleDeactivateUser : handleActivateUser}>
              Yes
            </Button>
          </div>
        </Box>
      </Modal>
    </Fragment>
  );
};

export default ConfirmStatus;
