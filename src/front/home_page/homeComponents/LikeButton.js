import React, { useEffect, useState } from 'react';
import styles from './LikeButton.module.css';

const LikeButton = ({ userId, productId, currentPrice}) => {
    const [liked, setLiked] = useState(false);

    // 처음 렌더링 시 좋아요 여부 확인
    useEffect(() => {
        const fetchLikeStatus = async () => {
            if (!userId || !productId) return;
            try {
                const res = await fetch(
                    `http://localhost:5050/api/likes/check?user_id=${userId}&product_id=${productId}`
                );
                const result = await res.json();
                setLiked(result.liked);
            } catch (err) {
                console.error("좋아요 상태 확인 실패:", err);
            }
        };
        fetchLikeStatus();
    }, [userId, productId]);

    // 좋아요 버튼 클릭 시 요청 처리
    const handleLike = async () => {
        if (!userId) {
            alert("로그인이 필요합니다.");
            return;
        }

        const url = "http://localhost:5050/api/likes";
        const method = liked ? "DELETE" : "POST";

        const bodyData = {
            user_id: userId,
            product_id: productId
        };

        if (!liked && currentPrice) {
            bodyData.liked_price = currentPrice; // POST일 때만 가격 추가
        }

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bodyData)
            });

            if (res.ok) {
                setLiked(!liked); // 요청 성공 시 liked 상태를 반전시켜 버튼 텍스트를 변경
            } else {
                alert("좋아요 처리 중 오류가 발생했습니다.");
            }
        } catch (error) {
            console.error("좋아요 처리 실패:", error);
        }
    };

    // 렌더링된 버튼
    return (
        <button className={styles.heart} onClick={handleLike}>
            {liked ? "❤️" : "🤍"}
        </button>
    );
};

export default LikeButton;
