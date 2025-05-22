const express = require('express');
const router = express.Router();
const pool = require('../db');

// 좋아요 등록
router.post('/', async (req, res) => {
    const { user_id, product_id, liked_price: clientLikedPrice } = req.body;

    if (!user_id || !product_id) {
        return res.status(400).json({ message: 'user_id 또는 product_id 누락' });
    }

    try {
        //  category_id 가져오기
        const [categoryRows] = await pool.query(
            "SELECT category_id  FROM products WHERE product_id = ?",
            [product_id]
        );

        if (categoryRows.length === 0) {
            return res.status(404).json({ message: '해당 상품이 존재하지 않습니다.' });
        }

        const category_id = categoryRows[0].category_id;

        let liked_price = clientLikedPrice;

        if (!liked_price) {
            // front에서 안 준 경우 DB에서 최신 가격 가져오기
            const [priceRows] = await pool.query(
                `SELECT price
                 FROM price_history
                 WHERE product_id = ?
                 ORDER BY checked_at DESC
                 LIMIT 1`,
                [product_id]
            );

            if (priceRows.length === 0) {
                return res.status(404).json({message: '해당 상품의 가격 기록이 없습니다.'});
            }

            liked_price = priceRows[0].price;
        }
// 좋아요 등록
        await pool.query(
            `INSERT INTO likes (user_id, product_id, category_id, liked_price, last_notified_at)
             VALUES (?, ?, ?, ?, NULL)
             ON DUPLICATE KEY UPDATE liked_price = VALUES(liked_price),last_notified_at = NULL`,
            [user_id, product_id, category_id, liked_price]
        );

        res.json({ message: '좋아요 등록 완료', liked_price });
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
// 마이페이지용 좋아요 상품 조회 API
router.get('/', async (req, res) => {
    const { user_id } = req.query;
    if (!user_id) {
        return res.status(400).json({ message: 'user_id가 없습니다' });
    }

    try {
        const [rows] = await pool.query(
            `SELECT 
          l.product_id,
          p.product_title,
          p.image_url,
          p.product_url,
          c.category_name,
          (
            SELECT ph.price
            FROM price_history ph
            WHERE ph.product_id = l.product_id
            ORDER BY ph.checked_at DESC
            LIMIT 1
          ) AS current_price
        FROM likes l
        JOIN products p ON l.product_id = p.product_id
        JOIN categories c ON l.category_id = c.category_id
        WHERE l.user_id = ?`,
            [user_id]
        );
        res.json(rows);
    } catch (err) {
        console.error('좋아요 조회 실패:', err);
        res.status(500).json({ message: '서버 오류' });
    }
});

module.exports = router;
