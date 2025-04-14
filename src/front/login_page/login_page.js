import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login_page = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5050/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            if (res.ok) {
                alert("✅ 로그인 성공!");
                localStorage.setItem("user", email); // 로그인 상태 저장
                navigate("/"); // 메인페이지로 이동
            } else {
                alert("❌ 로그인 실패: " + data.message);
            }
        } catch (err) {
            console.error("❌ 서버 오류:", err);
            alert("서버 오류 발생!");
        }
    };

    const goSignup = () => {
        navigate("/signup");
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>로그인</h2>
            <form onSubmit={handleLogin} style={styles.form}>
                <input
                    type="email"
                    placeholder="이메일"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                    required
                />
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                    required
                />
                <button type="submit" style={styles.button}>로그인</button>
            </form>
            <p style={{ marginTop: "1rem" }}>
                계정이 없으신가요?{" "}
                <span onClick={goSignup} style={styles.link}>회원가입</span>
            </p>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: "400px",
        margin: "3rem auto",
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
        textAlign: "center",
    },
    title: {
        marginBottom: "1.5rem",
        fontSize: "1.5rem",
        fontWeight: "bold",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
    },
    input: {
        padding: "0.8rem",
        borderRadius: "8px",
        border: "1px solid #ccc",
        fontSize: "1rem",
    },
    button: {
        padding: "0.8rem",
        borderRadius: "8px",
        border: "none",
        backgroundColor: "#1a73e8",
        color: "#fff",
        fontSize: "1rem",
        cursor: "pointer",
    },
    link: {
        color: "#1a73e8",
        textDecoration: "underline",
        cursor: "pointer",
    },
};

export default Login_page;
