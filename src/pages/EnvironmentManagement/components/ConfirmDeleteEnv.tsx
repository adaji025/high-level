import { Modal, Title, Box, Button, LoadingOverlay } from "@mantine/core";
import { toast } from "react-toastify";
import { Fragment, useState } from "react";
import useNotification from "../../../hooks/useNotification";
import { deleteEnvironment } from "../../../services/environment";

type Props = {
  openDelModal: boolean;
  close: () => void;
  envId: number | null;
  handleGetEnvironments: () => void;
};

const ConfirmDeleteEnv = ({
  close,
  envId,
  openDelModal,
  handleGetEnvironments,
}: Props) => {
  const [loading, setLoading] = useState(false);
  

  const { handleError } = useNotification();

  const handleDeleteEnv = () => {
    setLoading(true);

    if (envId)
      deleteEnvironment(envId)
        .then(() => {
          toast.success("Environment deleted successfully");
          handleGetEnvironments();
          close();
        })
        .catch((error: any) => {
          handleError(error.message);
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
        opened={openDelModal}
        onClose={close}
      >
        <Title order={3} ta="center" className="text-darkBlue">
          Confirm Delete
        </Title>
        <Box my={34} className="w-4/5 mx-auto">
          <div className="text-center font-bold text-xl mb-3">
            Are You sure you want to delete Environmnent
          </div>
          <div className="w-full flex justify-center mt-10 gap-5">
            <Button variant="dark" className="bg-darkBlue" onClick={close}>
              NO
            </Button>
            <Button variant="outline" onClick={handleDeleteEnv}>
              Yes
            </Button>
          </div>
        </Box>
      </Modal>
    </Fragment>
  );
};

export default ConfirmDeleteEnv;
