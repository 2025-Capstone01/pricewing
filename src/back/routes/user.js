const express = require('express');
const router = express.Router();
const pool = require('../db');

// 사용자 등록 API
router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        const [results] = await pool.query(
            'SELECT * FROM user WHERE email = ?',
            [email]
        );

        if (results.length > 0) {
            console.log('이미 존재하는 사용자:', email);
            return res.status(200).send('이미 존재하는 사용자입니다. 중복 저장하지 않습니다.');
        }

        const [insertResult] = await pool.query(
            'INSERT INTO user (email, user_password) VALUES (?, ?)',
            [email, password]
        );

        console.log('새로운 사용자 저장 완료:', email);
        res.status(200).json({
            message: '새로운 사용자가 저장되었습니다.',
            user_id: insertResult.insertId
        });

    } catch (err) {
        console.error('저장 실패:', err);
        res.status(500).send('저장 실패');
    }
});

module.exports = router;