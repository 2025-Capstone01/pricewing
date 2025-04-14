const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");

app.use(cors());
app.use(express.json());

app.post("/api/search", async (req, res) => {
    const { link } = req.body;
    console.log("🔍 검색 요청:", link);

    try {
        const [productRows] = await pool.query(
            "SELECT * FROM products WHERE product_url = ?",
            [link]
        );

        if (productRows.length === 0) {
            return res.status(404).json({ message: "상품이 없습니다." });
        }

        const product = productRows[0];

        const [historyRows] = await pool.query(
            `SELECT price, created_at AS checked_at
       FROM price_history
       WHERE product_id = ?
       ORDER BY created_at`,
            [product.product_id]
        );

        res.json({
            product: {
                name: product.product_title,
                image: product.image_url,
                currentPrice: historyRows.at(-1)?.price || 0,
            },
            priceHistory: historyRows,
        });
    } catch (err) {
        console.error("❌ DB 오류:", err);
        res.status(500).json({ message: "서버 오류" });
    }
});

// server.js
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const [rows] = await pool.query(
            "SELECT * FROM users WHERE email = ? AND user_password = ?",
            [email, password]
        );
        if (rows.length === 0) {
            return res.status(401).json({ message: "이메일 또는 비밀번호가 틀렸습니다." });
        }
        res.json({ message: "로그인 성공!" });
    } catch (err) {
        console.error("로그인 오류:", err);
        res.status(500).json({ message: "서버 오류" });
    }
});


app.post("/api/signup", async (req, res) => {
    const { email, password } = req.body;

    try {
        const [result] = await pool.query(
            "INSERT INTO users (email, user_password) VALUES (?, ?)",
            [email, password]
        );
        res.json({ message: "회원가입 성공!" });
    } catch (err) {
        console.error("❌ 회원가입 오류:", err);
        res.status(500).json({ message: "서버 오류" });
    }
});

app.listen(5050, () => {
    console.log("✅ 서버 실행 중: http://localhost:5050");
});
