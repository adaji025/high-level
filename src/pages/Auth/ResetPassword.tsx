import { Box, PasswordInput, LoadingOverlay, PinInput } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { useState } from "react";
import useNotification from "../../hooks/useNotification";
import { resetPassword } from "../../services/auth";
import { showNotification } from "@mantine/notifications";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);

  const { handleError } = useNotification();
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  const form = useForm({
    initialValues: {
      email,
      confirmPassword: "",
      newPassword: "",
      otp: "",
    },
  });

  const submit = (values: any) => {
    setLoading(true);
    resetPassword(values)
      .then(() => {
        showNotification({
          title: "Success",
          message: "Password reset successful",
          color: "green",
        });
        navigate("/");
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
    <>
      <LoadingOverlay visible={loading} />
      <div className="min-h-screen w-full flex flex-col justify-center items-center">
          <h1 className="text-center text-[24px] lg:text-[30px] font-semibold text-mainText">
            Create new password
          </h1>
          <h3 className="text-center font-medium mt-2 text-secondaryText/50">
            Must be at least 8 characters.
          </h3>
        <div className="max-w-[420px] w-full p-[20px]">
          <form onSubmit={form.onSubmit((values) => submit(values))}>
            <Box mt={16}>
              <PinInput size="md" {...form.getInputProps("otp")} />

              <Box>
                <PasswordInput
                  mt={24}
                  size="md"
                  placeholder="Choose a password"
                  {...form.getInputProps("newPassword")}
                />
                <span className="text-xs text-[#344054]">
                  Must be at least 8 characters.
                </span>
              </Box>
              <Box>
                <PasswordInput
                  mt={24}
                  size="md"
                  placeholder="Confirm password"
                  {...form.getInputProps("confirmPassword")}
                />
                <span className="text-xs text-[#344054]">
                  Must be at least 8 characters.
                </span>
              </Box>

              <button className="mt-6 w-full bg-highLevelRed text-white p-3 rounded-lg font-bold">
                Get started
              </button>
            </Box>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
