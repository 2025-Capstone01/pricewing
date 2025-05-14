// components/Header.js
import './Header.css';
import React from 'react';
import useNavigationHandler from './useNavigationHandler';
import { isLoggedIn } from '../login_page/session';
import { logout } from '../login_page/auth';

const Header = () => {
    const { goHome, goLogin, goMyPage, goSignUpPage } = useNavigationHandler();
    const [loggedIn, setLoggedIn] = React.useState(isLoggedIn());

    const handleLogout = () => {
        logout();
        setLoggedIn(false);
        goHome();
    };

    return (
        <header>
            <div className="buttons">
                <button onClick={goHome}>홈으로</button>
                {!loggedIn ? (
                    <>
                        <button onClick={goLogin}>로그인</button>
                        <button onClick={goSignUpPage}>회원가입페이지</button>
                    </>
                ) : (
                    <>
                        <button onClick={goMyPage}>마이페이지</button>
                        <button onClick={handleLogout}>로그아웃</button>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
