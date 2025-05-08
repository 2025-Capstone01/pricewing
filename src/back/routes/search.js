const express = require("express");
const router = express.Router();
const pool = require("../db"); // db.js에서 연결한 pool

// POST /api/search
router.post("/", async (req, res) => {
    const { link } = req.body;
    console.log("검색 요청 링크:", link);

    try {
        // 1. 상품 정보 조회
        const [productRows] = await pool.query(
            "SELECT * FROM products WHERE product_url = ?",
            [link]
        );

        if (productRows.length === 0) {
            return res.status(404).json({ message: "해당 상품이 없습니다." });
        }

        const product = productRows[0];

        // 2. 가격 변동 이력 조회
        const [historyRows] = await pool.query(
            "SELECT price, checked_at FROM price_history WHERE product_id = ? ORDER BY checked_at ASC",
            [product.product_id]
        );

        console.log("상품 결과:", product);
        console.log("가격 이력:", historyRows);

        // 3. 응답 반환
        res.json({
            ...product,
            current_price: historyRows.at(-1)?.price || product.original_price,
            price_history: historyRows
        });

    } catch (error) {
        console.error("검색 API 오류:", error);
        res.status(500).json({ message: "서버 오류" });
    }
});

module.exports = router;
