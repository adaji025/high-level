import {
  Box,
  Checkbox,
  PasswordInput,
  TextInput,
  LoadingOverlay,
} from "@mantine/core";
import { GoogleIcon } from "../../components/Svgs";
import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { userlogin } from "../../services/user";
import { useState } from "react";
import useNotification from "../../hooks/useNotification";
import { toast } from "react-toastify";
import HighLevel from "../../assets/svgs/high-level.svg";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { handleError } = useNotification();

  const notify = () => toast("Wow so easy!");

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      remember_me: false,
    },
  });

  const submit = (values: any) => {
    setLoading(true);
    userlogin(values)
      .then((res: any) => {
        if (res.data.access_token) {
          localStorage.setItem("high_level_token", res.data.access_token);
        }
        navigate("/");
        window.location.reload();
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
          Log in to your account
        </h1>
        <div className="max-w-[420px] w-full bg-white  rounded-xl px-[20px]">
          <h3 className="text-center text-secondaryText mt-2">
            Welcome back! Please enter your details.
          </h3>
          <form onSubmit={form.onSubmit((values) => submit(values))}>
            <Box mt={16}>
              <TextInput
                size="md"
                type="email"
                label="Email"
                required
                placeholder="Enter your email"
                {...form.getInputProps("email")}
              />

              <Box>
                <PasswordInput
                  mt={16}
                  size="md"
                  label="Password"
                  placeholder="Create a password"
                  {...form.getInputProps("password")}
                />
                <span className="text-xs text-[#344054]">
                  Must be at least 8 characters.
                </span>
              </Box>

              <div className="flex justify-between items-center mt-5">
                <Checkbox
                  size="sm"
                  label="Remember for 30 days"
                  {...form.getInputProps("remember_me")}
                />
                <div
                  className="text-[#17426D] font-semibold cursor-pointer"
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot Password
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 w-full bg-[#E84E38] text-white p-3 rounded-lg font-bold"
                // onClick={handleLogin}
              >
                Sign in
              </button>
              <button
                className="mt-6 font-bold w-full border border-darkBlue p-3 rounded-lg flex items-center justify-center gap-2"
                // onClick={handleLogin}
                type="button"
                onClick={notify}
              >
                <GoogleIcon />
                <div>Sign up with Google</div>
              </button>
            </Box>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
