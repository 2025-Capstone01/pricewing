import './Header.css';
import React, { useState } from 'react';
import useNavigationHandler from './useNavigationHandler';
import { isLoggedIn } from '../login_page/session';
import { logout } from '../login_page/auth';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const Header = () => {
    const { goHome, goLogin, goMyPage, goSignUpPage } = useNavigationHandler();
    const [loggedIn, setLoggedIn] = useState(isLoggedIn());
    const [notiOpen, setNotiOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);

    const handleLogout = () => {
        logout();
        setLoggedIn(false);
        goHome();
    };
    // ✅ user_id 가져오기 (login_page에 따라 localStorage 사용)
    const getUserId = () => {
        return localStorage.getItem('user_id');
    };

    // ✅ 알림 기록 가져오기
    const fetchAlerts = async () => {
        if (!loggedIn) return;

        const userId = getUserId();
        if (!userId) return;

        try {
            const res = await fetch(`http://localhost:5050/api/alerts/history?user_id=${userId}`);
            const data = await res.json();
            console.log("📜 알림 기록:", data);

            if (Array.isArray(data.alerts)) {
                setNotifications(data.alerts);
            }
        } catch (err) {
            console.error("🔔 알림 기록 가져오기 실패:", err);
        }
    };

    // ✅ 알림 삭제 함수 추가
    const handleDelete = async (id) => {
        try {
            const res = await fetch(`http://localhost:5050/api/alerts/history/${id}`, {
                method: 'DELETE',
            });
            const result = await res.json();
            console.log('❌ 삭제 응답:', result);

            // 삭제 성공 시 알림 목록에서 제거
            setNotifications((prev) => prev.filter((item) => item.id !== id));
        } catch (err) {
            console.error('삭제 실패:', err);
        }
    };


    // 🔔 버튼 클릭 시 알림 toggle + 최신화
    const handleToggle = () => {
        fetchAlerts(); // 눌렀을 때 fetch
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
                        style={{ cursor: 'pointer' }}
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

                {/* 오른쪽: 알림 🔔 */}
                <div className="header-right">
                    {loggedIn && (
                        <div className="noti-wrapper">
                            <button className="noti-button" onClick={handleToggle}>
                                🔔
                            </button>
                            {notiOpen && (
                                <div className="noti-panel">
                                    {notifications.length === 0 ? (
                                        <p>📌 새로운 알림이 없습니다.</p>
                                    ) : (
                                        <ul>
                                            {notifications.map((item, index) => (
                                                <li key={item.id} style={{ position: "relative", paddingRight: "24px" }}>
                                                    {/*삭제 버튼(로그인등 디자인 동일)*/}
                                                    <IconButton
                                                        onClick={() => handleDelete(item.id)}
                                                        size="small"
                                                        sx={{ position: 'absolute', right: 4, top: 4, color: 'gray' }}
                                                    >
                                                        <CloseIcon fontSize="small" />
                                                    </IconButton>
                                                    <div style={{ fontSize: "0.9rem", marginBottom: "6px", whiteSpace: "pre-line" }}>
                                                        📩 해당 알림은 이메일로 전송되었습니다.{"\n"}
                                                        메일 내용:{"\n"}
                                                        <strong>{item.product_title || '상품명 없음'}</strong> 가격이{' '}
                                                        <span style={{ color: 'red' }}>
                                                            {item.notified_price != null
                                                                ? item.notified_price.toLocaleString() + '원'
                                                                : '가격 정보 없음'}</span>{' '}으로 떨어졌어요! (
                                                        {item.notified_at
                                                            ? new Date(item.notified_at).toLocaleDateString()
                                                            : '날짜 없음'}
                                                        ）
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>

                                    )}
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
