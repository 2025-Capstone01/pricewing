// components/Header.js
import './Header.css';
import React from 'react';
import useNavigationHandler from './useNavigationHandler';
import { isLoggedIn } from '../login_page/session';
import { logout } from '../login_page/auth';

const Header = () => {
    const { goHome, goLogin, goMyPage, goSignUpPage } = useNavigationHandler();
    const [loggedIn, setLoggedIn] = React.useState(isLoggedIn());
    //알림창 열림 여부, 상태 설정 함수
    const [notiOpen, setNotiOpen] = React.useState(false);

    const handleLogout = async () => {
        await logout();
        setLoggedIn(false);
        goHome();
    };

    //알림창 토글 함수(종 버튼 누르면 true<->false 상태 바뀜)
    const handleToggle = () => {
        setNotiOpen((prev) => !prev);
    };

    return (
        <header>
            <div className="header-inner">
                {/* 왼쪽: 로고 */}
                <div className="header-left">
                    <img
                        src="/pricewing_logo.png"
                        alt="로고"
                        className="logo"
                        onClick={goHome}
                        style={{cursor: 'pointer'}}
                    />
                </div>

                {/* 가운데: 버튼들 */}
                <div className="header-center buttons">
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

                {/* 오른쪽: 알림 */}
                {/*로그인했을때만 종 버튼 보임*/}
                {/*버튼 누르면 setNotiOpen 값 바뀌고 알림창 열림*/}
                {/*알림 없으면 "새로운알림 없습니다" 기본 문구 출력*/}
                <div className="header-right">
                    {loggedIn && (
                        <div className="noti-wrapper">
                            <button className="noti-button" onClick={handleToggle}>
                                🔔
                            </button>
                            {notiOpen && (
                                <div className="noti-panel">
                                    <p>📌 새로운 알림이 없습니다.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;

