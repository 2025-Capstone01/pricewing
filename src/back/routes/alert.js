// routes/alert.js
const express = require('express');
const router = express.Router();
const pool = require('../db');
const { sendEmail } = require('../notify');

// 가격 변동 알림 체크
router.get('/check', async (req, res) => {
    try {
        // 모든 좋아요 정보 가져오기 (email 포함)
        const [likes] = await pool.query(`
            SELECT
                l.user_id, l.product_id, l.liked_price, l.last_notified_at,
                u.email,
                p.product_title, p.product_url
            FROM likes l
                     JOIN user u ON l.user_id = u.user_id
                     JOIN products p ON l.product_id = p.product_id
        `);

        const alerts = [];

        for (const like of likes) {
            // 최신 가격 가져오기
            const [priceRows] = await pool.query(`
                SELECT price, checked_at
                FROM price_history
                WHERE product_id = ?
                ORDER BY checked_at DESC
                LIMIT 1
            `, [like.product_id]);

            if (priceRows.length === 0) continue;

            const { price: currentPrice, checked_at } = priceRows[0];
            const notifiedTime = like.last_notified_at ? new Date(like.last_notified_at) : new Date(0);
            const priceTime = new Date(checked_at);

            // 가격이 낮아졌고, 아직 알림을 보내지 않았을 경우
            if (currentPrice < like.liked_price && priceTime > notifiedTime) {
                console.log(`📩 [TRIGGERED] product: ${like.product_title}, current: ${currentPrice}, liked: ${like.liked_price}, last_notified: ${notifiedTime}`);
                // 이메일 알림 보내기
                await sendEmail(
                    like.email,
                    like.product_title,
                    currentPrice,
                    like.product_url
                );

                // 알림 시간 업데이트
                await pool.query(`
                    UPDATE likes
                    SET last_notified_at = ?
                    WHERE user_id = ? AND product_id = ?
                `, [checked_at, like.user_id, like.product_id]);

                // 🔔 알림 기록 저장
                await pool.query(`
                    INSERT INTO alert_log (user_id, product_id, notified_price)
                    VALUES (?, ?, ?)
                `, [like.user_id, like.product_id, currentPrice]);

                alerts.push({
                    product: like.product_title,
                    newPrice: currentPrice,
                    email: like.email
                });
            }
        }

        res.json({
            message: '알림 처리 완료',
            alerts
        });
    } catch (err) {
        console.error('🔔 알림 체크 실패:', err);
        res.status(500).json({ message: '서버 오류' });
    }
});

// ✅ 알림 기록 조회
router.get('/history', async (req, res) => {
    const userId = req.query.user_id;
    if (!userId) return res.status(400).json({ message: 'user_id가 필요합니다' });

    try {
        const [rows] = await pool.query(`
            SELECT a.id, a.product_id, p.product_title, a.notified_price, a.notified_at
            FROM alert_log a
                     JOIN products p ON a.product_id = p.product_id
            WHERE a.user_id = ?
            ORDER BY a.notified_at DESC
        `, [userId]);

        res.json({ alerts: rows });
    } catch (err) {
        console.error('알림 기록 조회 오류:', err);
        res.status(500).json({ message: '서버 오류' });
    }
});

// 알림 기록 삭제
router.delete('/history/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await pool.query('DELETE FROM alert_log WHERE id = ?', [id]);
        res.json({ message: '삭제 완료' });
    } catch (err) {
        console.error('알림 삭제 오류:', err);
        res.status(500).json({ message: '서버 오류' });
    }
});

module.exports = router;
