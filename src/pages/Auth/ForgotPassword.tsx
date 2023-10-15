import { Box, LoadingOverlay, TextInput } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { useState } from "react";
import useNotification from "../../hooks/useNotification";
import { forgotPassword } from "../../services/auth";
import { showNotification } from "@mantine/notifications";
import HighLevel from "../../assets/svgs/high-level.svg";

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
      <div className="min-h-screen w-full flex flex-col justify-center items-center">
        <div className="my-10">
          <img src={HighLevel} alt="high level" />
        </div>
        <h1 className="text-center text-[24px] lg:text-[30px] font-semibold text-mainText">
          Forgot your password?
        </h1>
        <h3 className="text-center text-secondaryText">
          Enter your email and we’ll send reset link there
        </h3>
        <div className="max-w-[420px] w-full  p-5">
          <form onSubmit={form.onSubmit((values) => submit(values))}>
            <Box mt={16} className="flex flex-col items-center justify-center">
              <TextInput
                size="md"
                label="Email"
                placeholder="Enter your email"
                {...form.getInputProps("email")}
                className="w-full"
              />

              <button
                type="submit"
                className="mt-8 w-full bg-highLevelRed text-white p-3 rounded-lg font-bold"
              >
                Send Link
              </button>
            </Box>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
