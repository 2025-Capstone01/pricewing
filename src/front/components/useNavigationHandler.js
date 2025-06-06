import { useNavigate } from 'react-router-dom';

const useNavigationHandler = () => {
    const navigate = useNavigate();

    const goHome = (keyword) => navigate('/', { state: { keyword } });

    const goLogin = () => navigate('/Login');
    const goMyPage = () => navigate('/My');
    const goSignUpPage = () => navigate('/SignUp');

    return { goHome, goLogin, goMyPage, goSignUpPage };
};

export default useNavigationHandler;
