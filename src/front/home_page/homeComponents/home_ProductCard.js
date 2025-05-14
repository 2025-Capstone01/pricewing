import React, { useState, useEffect } from 'react';
import PriceChart from './PriceChart';

const Home_ProductCard = ({ data }) => {
    const [liked, setLiked] = useState(false);
    const userId = localStorage.getItem("user_id"); // 로그인한 사용자 ID

    useEffect(() => {
        const fetchLikeStatus = async () => {
            if (!userId || !data?.product_id) return;

            try {
                const res = await fetch(
                    `http://localhost:5050/api/likes/check?user_id=${userId}&product_id=${data.product_id}`
                );
                const result = await res.json();
                setLiked(result.liked);
            } catch (err) {
                console.error("좋아요 상태 확인 실패:", err);
            }
        };

        fetchLikeStatus();
    }, [data]);

    const handleLike = async () => {
        if (!userId) {
            alert("로그인이 필요합니다.");
            return;
        }

        const url = "http://localhost:5050/api/likes";
        const method = liked ? "DELETE" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_id: userId, product_id: data.product_id })
            });

            if (res.ok) {
                setLiked(!liked);
            } else {
                alert("좋아요 처리 중 오류가 발생했습니다.");
            }
        } catch (error) {
            console.error("좋아요 처리 실패:", error);
        }
    };

    const original = Number(data.original_price);
    const current = Number(data.current_price);

    const discountRate = original && original > current
        ? Math.round(((original - current) / original) * 100)
        : 0;

    return (
        <div className="product-card">
            <img src={data.image_url} alt={data.product_title} width={200} />
            <h3>{data.product_title}</h3>

            <button onClick={handleLike}>
                {liked ? '좋아요 취소' : '좋아요'}
            </button>

            <p>현재 가격: ₩{current.toLocaleString()}</p>
            <p style={{ color: "red" }}>정가: ₩{original.toLocaleString()}</p>
            {discountRate > 0 && (
                <p style={{ color: "green" }}>
                    할인율: {discountRate}% 할인 중!
                </p>
            )}

            <h3>가격 변동 그래프</h3>
            <PriceChart
                data={data.price_history}
                originalPrice={original}
            />
        </div>
    );
};

export default Home_ProductCard;
