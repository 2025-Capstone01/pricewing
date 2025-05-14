const express = require("express");
const router = express.Router();
const pool = require("../db"); // db.js에서 연결한 pool

// Day.js로 KST 날짜 처리
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);

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

        // 한국 시간 기준 오늘 날짜 (YYYY-MM-DD)
        const today = dayjs().tz("Asia/Seoul").format("YYYY-MM-DD");
        console.log("🇰🇷 KST 기준 today:", today);

        // 마지막 가격을 오늘 날짜까지 연장
        const priceHistory = [...historyRows];
        if (priceHistory.length > 0) {
            const last = priceHistory.at(-1);
            const lastDate = dayjs(last.checked_at).tz("Asia/Seoul").format("YYYY-MM-DD");
            if (lastDate !== today) {
                priceHistory.push({
                    price: last.price,
                    checked_at: today + 'T00:00:00.000Z' // MySQL과 그래프용 ISO 형태
                });
            }
        } else {
            // 가격 이력이 아예 없을 경우: 정가 기준으로 2개 생성
            priceHistory.push(
                { price: product.original_price, checked_at: today + 'T00:00:00.000Z' },
                { price: product.original_price, checked_at: today + 'T00:00:00.000Z' }
            );
        }

        console.log("상품 결과:", product);
        console.log("가격 이력:", historyRows);

        // 3. 응답 반환
        res.json({
            ...product,
            current_price: priceHistory.at(-1)?.price || product.original_price,
            price_history: priceHistory
        });

    } catch (error) {
        console.error("검색 API 오류:", error);
        res.status(500).json({ message: "서버 오류" });
    }
});

module.exports = router;
