import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const My_page = () => {
    const navigate = useNavigate();

    // ✅ 로그인 상태 확인 함수
    const isLoggedIn = () => {
        return !!localStorage.getItem("loggedInUser");
    };

    // ✅ 마운트될 때 로그인 안되어 있으면 로그인 페이지로 이동
    useEffect(() => {
        if (!isLoggedIn()) {
            alert("로그인이 필요합니다.");
            navigate("/login");
        }
    }, []);

    return (
        <div style={styles.container}>
            <h2>마이페이지입니다.</h2>
        </div>
    );
};

const styles = {
    container: {
        padding: "2rem",
        textAlign: "center",
        fontSize: "1.5rem",
    },
};

export default My_page;
