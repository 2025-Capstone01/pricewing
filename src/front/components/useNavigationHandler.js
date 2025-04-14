import { useNavigate } from "react-router-dom";

const useNavigationHandler = () => {
    const navigate = useNavigate();

    const goHome = () => navigate("/");
    const goLogin = () => navigate("/login");
    const goSignup = () => navigate("/signup");

    // ✅ 로그인 상태라면 마이페이지로, 아니면 로그인 페이지로
    const goMyPage = () => {
        if (isLoggedIn()) {
            navigate("/my");
        } else {
            navigate("/login");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("user"); // 로그인 정보 삭제
        alert("👋 로그아웃 되었습니다.");
        navigate("/"); // 홈으로 이동
        window.location.reload(); // 버튼 상태 반영
    };

    const isLoggedIn = () => {
        const user = localStorage.getItem("user");
        return !!user;
    };

    return {
        goHome,
        goLogin,
        goSignup,
        goMyPage,
        handleLogout,
        isLoggedIn,
    };
};

export default useNavigationHandler;
