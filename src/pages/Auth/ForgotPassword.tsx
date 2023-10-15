import { Box, LoadingOverlay, TextInput } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { useState } from "react";
import useNotification from "../../hooks/useNotification";
import { forgotPassword } from "../../services/auth";
import { showNotification } from "@mantine/notifications";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { handleError } = useNotification();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const submit = (values: any) => {
    setLoading(true);
    forgotPassword(values)
      .then(() => {
        showNotification({
          title: "Success",
          message: "OTP has been sent to you email",
          color: "green",
        });
        navigate("/reset-password");
        localStorage.setItem("email", values.email);
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
      <div className="auth min-h-screen w-full flex justify-center items-center">
        <div className="max-w-[490px] w-full bg-white drop-shadow-2xl border border-darkBlue rounded-xl p-[60px]">
          <h1 className="text-center text-[24px] lg:text-[40px] font-medium text-mainText">
            Welcome back
          </h1>
          <h3 className="text-center text-secondaryText">
            Enter Your registered Email
          </h3>
          <form onSubmit={form.onSubmit((values) => submit(values))}>
            <Box mt={16} className="flex flex-col items-center justify-center">
              <TextInput
                size="md"
                placeholder="Enter your email"
                {...form.getInputProps("email")}
                className="w-full"
              />

              <button
                type="submit"
                className="mt-6 w-full bg-darkBlue text-white p-3 rounded-lg font-bold"
              >
                Send
              </button>
            </Box>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
