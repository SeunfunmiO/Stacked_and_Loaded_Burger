
import { toast, ToastOptions, ToastPromiseParams, UpdateOptions } from 'react-toastify';
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
} as const;

// Toast service with different methods
const ToastService = {
    // Success toast
    success: (message: string, config = {}) => {
        toast.success(message, { ...toastConfig, ...config });
    },

    // Error toast
    error: (message: string, config = {}) => {
        toast.error(message, { ...toastConfig, ...config });
    },

    // Warning toast
    warning: (message: string, config = {}) => {
        toast.warn(message, { ...toastConfig, ...config });
    },

    // Info toast
    info: (message: string, config = {}) => {
        toast.info(message, { ...toastConfig, ...config });
    },

    // Default toast
    default: (message: string, config = {}) => {
        toast(message, { ...toastConfig, ...config });
    },

    // Promise toast for async operations
    promise: (promise: Promise<unknown> | (() => Promise<unknown>), messages: ToastPromiseParams<unknown, unknown, unknown>, config?: ToastOptions<unknown> | undefined) => {
        return toast.promise(promise, messages, { ...toastConfig, ...config });
    },

    // Loading toast
    loading: (message: string, config = {}) => {
        return toast.loading(message, { ...toastConfig, ...config });
    },

    // Update existing toast
    update: (toastId: string, options: UpdateOptions<unknown> | undefined) => {
        toast.update(toastId, options);
    },

    // Dismiss toast
    dismiss: (toastId: string) => {
        toast.dismiss(toastId);
    },

    // Clear all toasts
    clear: () => {
        toast.clearWaitingQueue();
        toast.dismiss();
    }
};

export default ToastService;