import { useState, Fragment, useEffect } from "react";
import { useForm } from "@mantine/form";
import {
  createUserCredentials,
  getUserCredentials,
  updateUserCredentials,
} from "../../../services/user";
import { toast } from "react-toastify";
import useNotification from "../../../hooks/useNotification";
import {
  Button,
  Group,
  LoadingOverlay,
  NumberInput,
  TextInput,
} from "@mantine/core";
import { UserCredentialTypes } from "../../../types/user";

const UpdateCredentials = () => {
  const [loading, setLoading] = useState(false);
  const [userCredentials, setUserCredentials] =
    useState<UserCredentialTypes | null>(null);

  useEffect(() => {
    handleGetUserCredentials();
  }, []);

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

  useEffect(() => {
    form.setValues({
      sendgrid_api_key: userCredentials ? userCredentials.sendgrid_api_key : "",
      sendgrid_email: userCredentials ? userCredentials.sendgrid_email : "",
      sendgrid_email_subject: userCredentials
        ? userCredentials.sendgrid_email_subject
        : "",
      twilio_account_sid: userCredentials
        ? userCredentials?.twilio_account_sid
        : "",
      twilio_auth_token: userCredentials
        ? userCredentials?.twilio_auth_token
        : "",
      twilio_sms_phone_number: userCredentials
        ? userCredentials.twilio_sms_phone_number
        : "",
    });
  }, [userCredentials]);

  const handleGetUserCredentials = () => {
    setLoading(true);

    getUserCredentials()
      .then((res: any) => {
        setUserCredentials(res.data);
      })
      .catch((err: any) => {
        handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const submit = (values: any) => {
    setLoading(true);

    updateUserCredentials(values)
      .then(() => {
        toast.success("User credentials updated successfully!");
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
      <form onSubmit={form.onSubmit((values) => submit(values))}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <TextInput
            required
            label="Send Grid API key"
            placeholder="Enter api key"
            {...form.getInputProps("sendgrid_api_key")}
            className="flex-1"
          />
          <TextInput
            required
            type="email"
            label="Send Grid Email"
            placeholder="Enter email"
            {...form.getInputProps("sendgrid_email")}
            className="flex-1"
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
            label="Twilo account sid"
            placeholder="Enter account sid"
            {...form.getInputProps("twilio_account_sid")}
          />
          <TextInput
            mt={8}
            required
            label="Twilo auth token"
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
        </div>
        <Group justify="center" mt={44}>
          <Button type="submit" className="bg-darkBlue w-1/3">
            Update Credentials
          </Button>
        </Group>
      </form>
    </Fragment>
  );
};

export default UpdateCredentials;
