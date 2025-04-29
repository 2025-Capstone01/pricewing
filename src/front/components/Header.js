// components/Header.js
import './Header.css';
import React from 'react';
import useNavigationHandler from './useNavigationHandler';

const Header = () => {
    const { goHome, goLogin, goMyPage, goSignUpPage } = useNavigationHandler();

    return (
        <header>
            <div className="buttons">
                <button onClick={goHome}>홈으로</button>
                <button onClick={goLogin}>로그인</button>
                <button onClick={goSignUpPage}>회원가입페이지</button>
                <button onClick={goMyPage}>마이페이지</button>
            </div>
        </header>
    );
};
export default Header;