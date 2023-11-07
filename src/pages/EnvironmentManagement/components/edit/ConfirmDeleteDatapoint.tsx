import { Modal, Box, Button, LoadingOverlay } from "@mantine/core";
import { toast } from "react-toastify";
import { Fragment, useState } from "react";
import useNotification from "../../../../hooks/useNotification";
import { deleteDatapoint } from "../../../../services/automation";

type Props = {
  opened: boolean;
  close: () => void;
  datapointId: number | null;
  callback: () => void;
};

const ConfirmDeleteDatapoint = ({
  close,
  opened,
  datapointId,
  callback,
}: Props) => {
  const [loading, setLoading] = useState(false);

  const { handleError } = useNotification();

  const handleDeleteDatapoint = () => {
    setLoading(true);

    if (datapointId)
      deleteDatapoint(datapointId)
        .then(() => {
          toast.success(`Datapoint deleted sucessfully`);
          callback();
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
        opened={opened}
        onClose={close}
      >
        <Box my={34} className="w-4/5 mx-auto">
          <div className="text-center font-bold text-xl mb-3">
            Are You sure you want to delete this Datapoint
          </div>
          <div className="w-full flex justify-center mt-10 gap-5">
            <Button variant="dark" className="bg-darkBlue" onClick={close}>
              NO
            </Button>
            <Button variant="outline" onClick={handleDeleteDatapoint}>
              Yes
            </Button>
          </div>
        </Box>
      </Modal>
    </Fragment>
  );
};

export default ConfirmDeleteDatapoint;
