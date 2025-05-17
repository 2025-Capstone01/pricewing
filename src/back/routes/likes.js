const express = require('express');
const router = express.Router();
const pool = require('../db');

// 좋아요 등록
router.post('/', async (req, res) => {
    const { user_id, product_id } = req.body;

    if (!user_id || !product_id) {
        return res.status(400).json({ message: 'user_id 또는 product_id 누락' });
    }

    try {
        // product_id로 category_id 조회
        const [rows] = await pool.query(
            "SELECT category_id FROM products WHERE product_id = ?",
            [product_id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: '해당 상품이 존재하지 않습니다.' });
        }

        const category_id = rows[0].category_id;

        await pool.query(
            "INSERT IGNORE INTO likes (user_id, product_id, category_id) VALUES (?, ?, ?)",
            [user_id, product_id, category_id]
        );
        res.json({ message: '좋아요 등록 완료' });
    } catch (err) {
        console.error('좋아요 등록 실패:', err);
        res.status(500).json({ message: '서버 오류' });
    }
});

// 좋아요 취소
router.delete('/', async (req, res) => {
    const { user_id, product_id } = req.body;

    if (!user_id || !product_id) {
        return res.status(400).json({ message: 'user_id 또는 product_id 누락' });
    }

    try {
        await pool.query(
            "DELETE FROM likes WHERE user_id = ? AND product_id = ?",
            [user_id, product_id]
        );
        res.json({ message: '좋아요 취소 완료' });
    } catch (err) {
        console.error('좋아요 삭제 실패:', err);
        res.status(500).json({ message: '서버 오류' });
    }
});

// 좋아요 여부 확인
router.get('/check', async (req, res) => {
    const { user_id, product_id } = req.query;

    if (!user_id || !product_id) {
        return res.status(400).json({ message: 'user_id 또는 product_id 누락' });
    }

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

// GET /api/likes 만들어야해!!

module.exports = router;
