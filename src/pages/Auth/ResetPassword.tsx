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
    <div className="bg-white p-10">
      <LoadingOverlay visible={loading} />
      <div className="auth min-h-[calc(100vh-80px)] w-full flex justify-center items-center">
        <div className="max-w-[490px] w-full bg-white drop-shadow-2xl border border-darkBlue rounded-xl p-[60px]">
          <h1 className="text-center text-[24px] lg:text-[40px] font-medium text-mainText">
            Reset Password
          </h1>
          <form onSubmit={form.onSubmit((values) => submit(values))}>
            <Box mt={16}>
              <PinInput size="md" {...form.getInputProps("otp")} />

              <Box>
                <PasswordInput
                  mt={16}
                  size="md"
                  label="New Password"
                  placeholder="********"
                  {...form.getInputProps("newPassword")}
                />
                <span className="text-xs text-[#344054]">
                  Must be at least 8 characters.
                </span>
              </Box>
              <Box>
                <PasswordInput
                  mt={16}
                  size="md"
                  label="Confirm password"
                  placeholder="********"
                  {...form.getInputProps("confirmPassword")}
                />
                <span className="text-xs text-[#344054]">
                  Must be at least 8 characters.
                </span>
              </Box>

              <button className="mt-6 w-full bg-darkBlue text-white p-3 rounded-lg font-bold">
                Get started
              </button>
            </Box>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
