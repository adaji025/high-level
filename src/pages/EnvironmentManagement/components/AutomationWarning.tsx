import { Modal, Title, Box } from "@mantine/core";

type Props = {
  opened: boolean;
  close: () => void;
};

const AutomationWarning = ({ close, opened }: Props) => {
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
      <Title order={3} ta="center" className="text-darkBlue">
        Automation name
      </Title>
      <Box my={34} className="w-4/5 mx-auto">
        <div className="text-center font-bold text-2xl mb-3">85%</div>
        <div className="w-full bg-gray-200 h-1 rounded-full">
          <div className={`h-1 w-[85%] bg-darkBlue rounded-full`}></div>
        </div>
      </Box>
      <div className="text-center font-bold text-darkBlue mt-20">You’ve almost reached your limit (25 left)</div>
    </Modal>
  );
};

export default AutomationWarning;
