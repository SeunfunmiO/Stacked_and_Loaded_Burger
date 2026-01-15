
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import 'react-toastify/ReactToastify.css'
// Toast configuration

const toastConfig = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
};

// Toast service with different methods
const ToastService = {
    // Success toast
    success: (message, config = {}) => {
        toast.success(message, { ...toastConfig, ...config });
    },

    // Error toast
    error: (message, config = {}) => {
        toast.error(message, { ...toastConfig, ...config });
    },

    // Warning toast
    warning: (message, config = {}) => {
        toast.warn(message, { ...toastConfig, ...config });
    },

    // Info toast
    info: (message, config = {}) => {
        toast.info(message, { ...toastConfig, ...config });
    },

    // Default toast
    default: (message, config = {}) => {
        toast(message, { ...toastConfig, ...config });
    },

    // Promise toast for async operations
    promise: (promise, messages, config = {}) => {
        return toast.promise(promise, messages, { ...toastConfig, ...config });
    },

    // Loading toast
    loading: (message, config = {}) => {
        return toast.loading(message, { ...toastConfig, ...config });
    },

    // Update existing toast
    update: (toastId, options) => {
        toast.update(toastId, options);
    },

    // Dismiss toast
    dismiss: (toastId) => {
        toast.dismiss(toastId);
    },

    // Clear all toasts
    clear: () => {
        toast.clearWaitingQueue();
        toast.dismiss();
    }
};

export default ToastService;