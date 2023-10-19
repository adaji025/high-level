import { Modal, Title, TextInput, Button, LoadingOverlay } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState, Fragment } from "react";
import {
  createEnvironment,
  getEnvironment,
} from "../../../services/environment";
import useNotification from "../../../hooks/useNotification";
import { toast } from "react-toastify";
import { EnvironmentState } from "../../../types/environments";

type Props = {
  opened: boolean;
  close: () => void;
  setEnvironments: React.Dispatch<
    React.SetStateAction<EnvironmentState | null>
  >;
};

const AddEnvironment = ({ close, opened, setEnvironments }: Props) => {
  const [loading, setLoading] = useState(false);
  const [page] = useState(1);
  const [size] = useState(10);

  const { handleError } = useNotification();

  const form = useForm({
    initialValues: {
      agency: "",
      api_key: "",
    },
  });

  const handleGetEnvironments = () => {
    getEnvironment(page, size)
      .then((res: any) => {
        setEnvironments(res.data);
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const submit = (values: any) => {
    setLoading(true);
    createEnvironment(values)
      .then(() => {
        toast.success("Environment created successfully");
        handleGetEnvironments();
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        setLoading(false);
        form.reset();
        close();
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
        <Title order={3} ta="center">
          Add New Environment
        </Title>
        <form onSubmit={form.onSubmit((values) => submit(values))}>
          <TextInput
            mt={24}
            label="Agency Name"
            placeholder="Enter Agency name"
            {...form.getInputProps("agency")}
          />
          <TextInput
            mt={24}
            label="API Key"
            placeholder="Enter API key"
            {...form.getInputProps("api_key")}
          />
          <Button
            type="submit"
            my={32}
            size="lg"
            className="bg-highLevelRed w-full"
          >
            Add
          </Button>
        </form>
      </Modal>
    </Fragment>
  );
};

export default AddEnvironment;
