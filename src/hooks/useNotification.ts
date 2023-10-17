import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useNotification = () => {
  const navigate = useNavigate();

  const logoutUser = () => {
    toast.error(`User logged out Login in to continue 😑`);
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleError = (error: any) => {
    if (!error.response) {
      return toast.error("Network Error, Please check your connection");
    }

    if (error?.response?.status === 401) {
      return logoutUser();
    }

    if (error?.response?.status === 500) {
      return toast.error(
        `${
          error?.response?.data?.message ?? "An error occured, please try again"
        } 🤥`
      );
    }

    if (typeof error?.response?.data?.errors === "object" && error !== null) {
      for (const [_, value] of Object?.entries(error?.response?.data?.errors)) {
        if (typeof value === "string") {
          toast.error(`${value} 🤥`);
        }
      }
    } else {
      toast.error(`${error?.response?.data?.message} 🤥`);
    }
  };
  return {
    handleError,
    logoutUser,
  };
};

export default useNotification;
