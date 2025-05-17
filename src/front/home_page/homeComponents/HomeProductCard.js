import React from 'react';
import LikeButton from './LikeButton';
import DiscountRate from './DiscountRate';
import PriceChart from './PriceChart';
import GraphDescription from './GraphDescription';


const HomeProductCard = ({ data }) => {
    const userId = localStorage.getItem("user_id"); // 로그인한 사용자 ID

    const original = Number(data.original_price);
    const current = Number(data.current_price);

    return (
        <div className="product-card">
            <img src={data.image_url} alt={data.product_title} width={200} />
            <h3>{data.product_title}</h3>

            {/* 좋아요 버튼 */}
            <LikeButton userId={userId} productId={data.product_id} />

            {/* 가격 정보 */}
            <p>현재 가격: ₩{current.toLocaleString()}</p>
            <p>정가: ₩{original.toLocaleString()}</p>

            {/* 할인율 표시 */}
            <DiscountRate originalPrice={original} currentPrice={current} />

            {/* 가격 그래프 */}
            <h3>가격 변동 그래프</h3>
            <PriceChart
                data={data.price_history}
                originalPrice={original}
            />
            <GraphDescription />
        </div>
    );
};

export default HomeProductCard;
