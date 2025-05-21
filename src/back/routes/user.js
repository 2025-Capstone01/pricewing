const express = require('express');
const router = express.Router();
const pool = require('../db');
const admin = require('../firebaseAdmin');

//  사용자 등록 API (Firebase + MySQL)
router.post('/register', async (req, res) => {
    let { email, password, uid } = req.body;


    if (!email || !uid) {
        return res.status(400).json({ message: '이메일과 uid는 필수입니다.' });
    }

    try {
        //일반 회원가입인 경우 Firebase 유저 생성
        if (password && password.length >= 6) {
            const userRecord = await admin.auth().createUser({ email, password });
            uid = userRecord.uid; // 보안상 실제 Firebase UID 사용
        }

        //MySQL 중복 확인 (email 또는 uid)
        const [existingUsers] = await pool.query(
            'SELECT * FROM user WHERE email = ? OR uid = ?',
            [email, uid]
        );

        if (existingUsers.length > 0) {
            return res.status(200).json({
                message: '이미 존재하는 사용자입니다.',
                user_id: existingUsers[0].user_id
            });
        }

        // 사용자 정보 저장
        const [insertResult] = await pool.query(
            'INSERT INTO user (email, user_password, uid) VALUES (?, ?, ?)',
            [email, password, uid]
        );

        console.log('✅ 새로운 사용자 등록 완료:', email);
        res.status(201).json({
            message: '회원가입 성공',
            user_id: insertResult.insertId
        });

    } catch (err) {
        console.error('❌ 회원가입 실패:', err);
        res.status(500).json({
            message: '회원가입 실패',
            error: err.message
        });
    }
});

// 📌 이메일로 user_id 조회 API (프론트에서 user_id 확보용)
router.get('/id', async (req, res) => {
    const { email } = req.query;

    try {
        const [rows] = await pool.query(
            'SELECT user_id FROM user WHERE email = ?',
            [email]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
        }

        res.json({ user_id: rows[0].user_id });
    } catch (err) {
        console.error('user_id 조회 실패:', err);
        res.status(500).json({ message: '서버 오류' });
    }
});

module.exports = router;
