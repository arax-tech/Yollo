import { useSelector } from 'react-redux';
import RedirectLoading from './RedirectLoading';

const Auth = ({ children }) => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    return isAuthenticated && isAuthenticated === true ? children : <RedirectLoading />
}

export default Auth
