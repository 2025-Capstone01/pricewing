import { useNavigate } from 'react-router-dom';

const useNavigationHandler = () => {
    const navigate = useNavigate();

    const goHome = () => navigate('/');
    const goLogin = () => navigate('/Login');
    const goMyPage = () => navigate('/My');

    return { goHome, goLogin, goMyPage };
};

export default useNavigationHandler;
