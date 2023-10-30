import { Modal, Title, Box, Button, LoadingOverlay } from "@mantine/core";
import { toast } from "react-toastify";
import { Fragment, useState } from "react";
import useNotification from "../../../hooks/useNotification";
import { deleteAutomation } from "../../../services/automation";

type Props = {
  opened: boolean;
  close: () => void;
  automationId: number | null;
  handleGetLatestAutomation: () => void;
};

const ConfirmDeleteAutomation = ({
  close,
  opened,
  automationId,
  handleGetLatestAutomation,
}: Props) => {
  const [loading, setLoading] = useState(false);

  const { handleError } = useNotification();

  const handleDeleteAutomation = () => {
    setLoading(true);

    if (automationId)
      deleteAutomation(automationId)
        .then(() => {
          toast.success(`Automation deleted sucessfully`);
          handleGetLatestAutomation();
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
        <Title order={3} ta="center" className="text-darkBlue">
          Automation name
        </Title>
        <Box my={34} className="w-4/5 mx-auto">
          <div className="text-center font-bold text-xl mb-3">
            Are You sure you want to delete Automation
          </div>
          <div className="w-full flex justify-center mt-10 gap-5">
            <Button variant="dark" className="bg-darkBlue" onClick={close}>
              NO
            </Button>
            <Button variant="outline" onClick={handleDeleteAutomation}>
              Yes
            </Button>
          </div>
        </Box>
      </Modal>
    </Fragment>
  );
};

export default ConfirmDeleteAutomation;
