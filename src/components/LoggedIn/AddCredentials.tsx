import { Fragment, useState } from "react";
import {
  Modal,
  Button,
  Divider,
  Text,
  TextInput,
  NumberInput,
  LoadingOverlay,
  Group,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { toast } from "react-toastify";
import useNotification from "../../hooks/useNotification";
import { createUserCredentials } from "../../services/user";

type Props = {
  opened: boolean;
  close: () => void;
};

const AddCredentials = ({ close, opened }: Props) => {
  const [loading, setLoading] = useState(false);

  const { handleError } = useNotification();

  const form = useForm({
    initialValues: {
      sendgrid_api_key: "",
      sendgrid_email: "",
      sendgrid_email_subject: "",
      twilio_account_sid: "",
      twilio_auth_token: "",
      twilio_sms_phone_number: "",
    },
  });

  const submit = (values: any) => {
    setLoading(true);

    createUserCredentials(values)
      .then(() => {
        toast.success("User credentials created successfully!");
        close();
        form.reset();
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Fragment>
      <LoadingOverlay visible={loading} />
      <Modal
        centered
        opened={opened}
        onClose={close}
        title={<Text fw={900}>Create User Credentials</Text>}
      >
        <Divider mb={8} />
        <form onSubmit={form.onSubmit((values) => submit(values))}>
          <TextInput
            required
            label="Send Grid API key"
            placeholder="Enter api key"
            {...form.getInputProps("sendgrid_api_key")}
          />
          <TextInput
            mt={8}
            required
            type="email"
            label="Send Grid Email"
            placeholder="Enter email"
            {...form.getInputProps("sendgrid_email")}
          />
          <TextInput
            mt={8}
            required
            label="Send grid email subject"
            placeholder="Enter subject"
            {...form.getInputProps("sendgrid_email_subject")}
          />
          <TextInput
            mt={8}
            required
            label="Twailo account sid"
            placeholder="Enter account sid"
            {...form.getInputProps("twilio_account_sid")}
          />
          <TextInput
            mt={8}
            required
            label="Twailo auth token"
            placeholder="Enter token"
            {...form.getInputProps("twilio_auth_token")}
          />
          <NumberInput
            mt={8}
            hideControls
            required
            label="Twailo sms Phone number"
            placeholder="Enter phone number"
            {...form.getInputProps("twilio_sms_phone_number")}
          />

          <Group justify="center">
            <Button type="submit" mt={16} className="bg-darkBlue w-1/2">
              Create Credentials
            </Button>
          </Group>
        </form>
      </Modal>
    </Fragment>
  );
};

export default AddCredentials;
