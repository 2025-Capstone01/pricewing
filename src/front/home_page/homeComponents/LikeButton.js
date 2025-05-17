import React, { useEffect, useState } from 'react';

const LikeButton = ({ userId, productId }) => {
    const [liked, setLiked] = useState(false);

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
                body: JSON.stringify({ user_id: userId, product_id: productId })
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

    return (
        <button onClick={handleLike}>
            {liked ? '좋아요 취소' : '좋아요'}
        </button>
    );
};

export default LikeButton;
