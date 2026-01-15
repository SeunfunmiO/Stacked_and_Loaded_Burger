
import { ToastContainer as ReactToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css'

const ToastContainer = () => {

    {/* <ToastServer/> */ }
    return (
        <ReactToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
    );
};

export default ToastContainer;