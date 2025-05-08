const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

const app = express();

// ✅ 允许 JSON 请求
app.use(express.json());

// ✅ 启用 CORS（可选：如你只服务静态页面并用同端口可以注释掉）
app.use(cors());

// ✅ 连接数据库（使用 promise pool）
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'price_tracker',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}).promise();

// ✅ 提供 React 构建后的静态资源
app.use(express.static(path.join(__dirname, '../build')));

// ✅ 注册接口：写入新用户（避免重复）
app.post('/api/users', async (req, res) => {
    const { email, password } = req.body;
    const user_id = uuidv4();

    try {
        const [results] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

        if (results.length > 0) {
            console.log('用户已存在:', email);
            return res.status(200).send('用户已存在，无需重复写入');
        }

        await pool.query('INSERT INTO users (user_id, email, password) VALUES (?, ?, ?)', [
            user_id,
            email,
            password
        ]);

        console.log('新用户已写入:', email);
        res.status(200).send('新用户已记录');
    } catch (err) {
        console.error('数据库错误:', err);
        res.status(500).send('写入失败');
    }
});

// ✅ 商品查询接口：返回商品基本信息和历史价格
app.post('/api/search', async (req, res) => {
    const { link } = req.body;
    console.log('🔍 검색 요청:', link);

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

// ✅ 所有非 API 的请求都返回前端 index.html（支持 React Router）
// app.get('*', (req, res) => {
//     if (!req.path.startsWith('/api')) {
//         res.sendFile(path.join(__dirname, '../build/index.html'));
//     }
// });
app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

// ✅ 启动服务
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`✅ 服务已启动: http://localhost:${PORT}`);
});
