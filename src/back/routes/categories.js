const express = require('express');
const router = express.Router();
const pool = require('../db');

// DB에서 카테고리 전부 가져오기
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT category_id, category_name FROM categories");
        res.json(rows);
    } catch (err) {
        console.error("카테고리 조회 실패:", err);
        res.status(500).json({ message: "서버 오류" });
    }
});

module.exports = router;