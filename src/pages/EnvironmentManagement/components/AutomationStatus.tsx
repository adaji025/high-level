import { Modal, Title, Progress } from "@mantine/core";
import { AutomationItemTypes } from "../../../types/automation";

type Props = {
  viewStatus: boolean;
  close: () => void;
  autDetails: AutomationItemTypes | null;
};

const AutomationStatus = ({ close, viewStatus, autDetails }: Props) => {
  return (
    <Modal
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      centered
      opened={viewStatus}
      onClose={close}
    >
      <Title order={3} ta="center" className="text-darkBlue capitalize">
        {autDetails?.name}
      </Title>
      <div className="w-4/5 mx-auto">
        <Progress my={34} value={autDetails ? autDetails?.progress : 0} />
      </div>
      <div className="text-center font-bold text-darkBlue my-10">
        You’ve almost reached your limit ({autDetails && 100 - autDetails?.progress}% left)
      </div>
    </Modal>
  );
};

export default AutomationStatus;
