import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastSuccess = (message) => {
  toast.success(message, {
    position: "bottom-center",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "dark",
  });
};

const toastError = (message) => {
  toast.error(message, {
    position: "bottom-center",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "dark",
  });
};

export { toastError, toastSuccess };
