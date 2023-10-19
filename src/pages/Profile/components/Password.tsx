import { useState, Fragment } from "react";
import { Button, Divider, PasswordInput, LoadingOverlay } from "@mantine/core";
import { useForm } from "@mantine/form";
import { changePassword } from "../../../services/user";
import useNotification from "../../../hooks/useNotification";
import { toast } from "react-toastify";

const Password = () => {
  const [loading, setLoading] = useState(false);

  const { handleError } = useNotification();
  const form = useForm({
    initialValues: {
      old_password: "",
      new_password: "",
      confirm_password: "",
    },
    validate: {
      confirm_password: (value, values) =>
        value !== values.new_password ? "Passwords did not match" : null,
    },
  });

  const submit = (values: any) => {
    setLoading(true);
    changePassword(values)
      .then(() => {
        toast.success("Password updated successfully");
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        setLoading(false);
        form.reset();
      });
  };

  return (
    <Fragment>
      <LoadingOverlay visible={loading} />
      <h2 className="font-semibold text-lg">Password</h2>
      <div className="text-sm text-secondaryText mt-2">
        Please enter your current password to change your password.
      </div>
      <form onSubmit={form.onSubmit((values) => submit(values))}>
        <div className="py-10 mt-10 border-t">
          <div className=" flex gap-5 flex-col sm:flex-row justify-between md:w-4/5">
            <div className="w-2/5">
              <div className="font-semibold">Current password</div>
            </div>
            <PasswordInput
              placeholder="********"
              size="lg"
              className="flex-1"
              {...form.getInputProps("old_password")}
            />
          </div>
        </div>

        <div className="py-10 border-t">
          <div className="mt-10 flex gap-5 flex-col sm:flex-row justify-between md:w-4/5">
            <div className="w-2/5">
              <div className="font-semibold">New password</div>
            </div>
            <PasswordInput
              placeholder="********"
              size="lg"
              className="flex-1"
              {...form.getInputProps("new_password")}
            />
          </div>
        </div>

        <div className="py-10 border-t">
          <div className="mt-10 flex gap-5 flex-col sm:flex-row justify-between md:w-4/5">
            <div className="w-2/5">
              <div className="font-semibold">Confirm password</div>
            </div>
            <PasswordInput
              placeholder="********"
              size="lg"
              className="flex-1"
              {...form.getInputProps("confirm_password")}
            />
          </div>
        </div>

        <Divider mt={100} />
        <div className="flex mt-10 gap-3 font-semibold text-black hover:text-black/70 justify-end pb-10">
          <Button
            size="lg"
            variant="outline"
            className="font-semibold flex text-darkBlue border-darkBlue"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            size="lg"
            className="bg-darkBlue rounded-lg font-semibold text-white flex"
          >
            Update password
          </Button>
        </div>
      </form>
    </Fragment>
  );
};

export default Password;
