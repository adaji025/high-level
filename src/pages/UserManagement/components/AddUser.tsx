import { Modal, Title, TextInput, Button, LoadingOverlay } from "@mantine/core";
import { Fragment, useState } from "react";
import { createUser } from "../../../services/user";
import { useForm } from "@mantine/form";
import { toast } from "react-toastify";
import useNotification from "../../../hooks/useNotification";

type Props = {
  opened: boolean;
  close: () => void;
};

const AddUser = ({ close, opened }: Props) => {
  const [loading, setLoading] = useState(false);

  const { handleError } = useNotification();

  const form = useForm({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "admin",
    },
  });

  const submit = (values: any) => {
    setLoading(true);

    createUser(values)
      .then(() => {
        toast.success("User created successfully");
      })
      .catch((error) => {
        handleError(error);
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
        <Title order={3} ta="center">
          Enter user info
        </Title>
        <form onSubmit={form.onSubmit((values) => submit(values))}>
          <TextInput
            mt={8}
            label="First name"
            placeholder="Example name"
            {...form.getInputProps("first_name")}
          />
          <TextInput
            mt={8}
            label="Last name name"
            placeholder="Example name"
            {...form.getInputProps("last_name")}
          />
          <TextInput
            type="email"
            mt={8}
            label="Email"
            placeholder="example@gmail.com"
            {...form.getInputProps("email")}
          />
          <Button
            type="submit"
            my={32}
            size="lg"
            className="bg-highLevelRed w-full"
          >
            Add new User
          </Button>
        </form>
      </Modal>
    </Fragment>
  );
};

export default AddUser;
