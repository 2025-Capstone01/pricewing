const express = require('express');
const router = express.Router();
const pool = require('../db');

// POST /api/likes
router.post('/', async (req, res) => {
    const { user_id, product_id } = req.body;

    try {
        await pool.query(
            "INSERT IGNORE INTO likes (user_id, product_id) VALUES (?, ?)",
            [user_id, product_id]
        );
        res.json({ message: '좋아요 추가됨' });
    } catch (err) {
        console.error('좋아요 추가 실패:', err);
        res.status(500).json({ message: '서버 오류' });
    }
});

// DELETE /api/likes
router.delete('/', async (req, res) => {
    const { user_id, product_id } = req.body;

    try {
        await pool.query(
            "DELETE FROM likes WHERE user_id = ? AND product_id = ?",
            [user_id, product_id]
        );
        res.json({ message: '좋아요 취소됨' });
    } catch (err) {
        console.error('좋아요 삭제 실패:', err);
        res.status(500).json({ message: '서버 오류' });
    }
});

// GET /api/likes/check?user_id=1&product_id=101
router.get('/check', async (req, res) => {
    const { user_id, product_id } = req.query;

    try {
        const [rows] = await pool.query(
            "SELECT 1 FROM likes WHERE user_id = ? AND product_id = ?",
            [user_id, product_id]
        );

        res.json({ liked: rows.length > 0 });
    } catch (err) {
        console.error('좋아요 여부 확인 실패:', err);
        res.status(500).json({ message: '서버 오류' });
    }
});

// GET /api/likes

module.exports = router;
