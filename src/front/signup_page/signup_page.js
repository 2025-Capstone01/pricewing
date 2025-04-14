import { useState } from "react";
import {useNavigate} from "react-router-dom";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const handleSignup = async (e) => {
        e.preventDefault();
        console.log("✅ 가입 버튼 클릭됨");

        try {
            const res = await fetch("http://localhost:5050/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            if (res.ok) {
                alert("🎉 회원가입 성공!");
                setEmail("");
                setPassword("");
                navigate("/login");
            } else {
                alert("❌ 회원가입 실패: " + data.message);
            }
        } catch (err) {
            alert("서버 오류 발생!");
            console.error(err);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>회원가입</h2>
            <form onSubmit={handleSignup} style={styles.form}>
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
                <button type="submit" style={styles.button}>가입하기</button>
            </form>
        </div>
    );
}

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
};
