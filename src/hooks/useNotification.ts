import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useNotification = () => {
  const navigate = useNavigate();

  const logoutUser = () => {
    toast.warn(`User logged out Login in to continue 😑`);
    localStorage.clear();
    navigate("/");
  };

  const handleError = (error: any) => {
    if (!error.response) {
      return toast.error("Network Error, Please check your connection");
    }
    if (error.response.status === 404) {
      return toast.error("Route not found");
    }
    if (error.response.data.error === "Invalid Token") {
      logoutUser();
      return toast.error("Route not found");
    }

    if (error) {
      return toast.error(error.response.data.error);
    }

    if (error?.response?.status === 401 || error?.response?.status === 403) {
      toast.error("Unauthorized");
      return logoutUser();
    }

    if (error?.response?.status === 500) {
      return toast.error(
        `${
          error?.response?.data?.message ?? "An error occured, please try again"
        } 🤥`
      );
    }

    if (typeof error?.response?.data === "object" && error !== null) {
      for (const [_, value] of Object?.entries(error?.response?.data)) {
        if (typeof value === "string") {
          toast.error(`${value} 🤥`);
        }
      }
    } else {
      toast.error(`${error?.response?.data?.error} 🤥`);
    }
  };
  return {
    handleError,
    logoutUser,
  };
};

export default useNotification;
