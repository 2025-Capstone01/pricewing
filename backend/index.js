const express = require('express');
const mysql = require('mysql2');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'price_tracker',
});

app.post('/api/users', (req, res) => {
    const { email, password } = req.body;

    const user_id = uuidv4();

    const checkQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(checkQuery, [email], (err, results) => {
        if (err) {
            console.error('查询失败:', err);
            return res.status(500).send('查询失败');
        }

        if (results.length > 0) {
            console.log('用户已存在:', email);
            return res.status(200).send('用户已存在，无需重复写入');
        }

        const insertQuery = 'INSERT INTO users (user_id,email, password) VALUES (?, ?, ?)';
        db.query(insertQuery, [user_id,email, password], (err, _result) => {
            if (err) {
                console.error('写入失败:', err);
                return res.status(500).send('写入失败');
            }

            console.log('新用户已写入:', email);
            res.status(200).send('新用户已记录');
        });
    });
});

app.listen(5000, () => {
    console.log('后端服务运行在 http://localhost:5000');
});
