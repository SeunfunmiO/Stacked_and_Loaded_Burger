
import { ToastContainer as ReactToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css'
import ToastServer from './ToastServer';

const ToastContainer = () => {
   
{/* <ToastServer/> */}
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
            theme={'dark' === 'dark' ? 'dark' : 'light'}
        />
    );
};

export default ToastContainer;