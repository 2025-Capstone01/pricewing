import React from 'react';
import PriceChart from './PriceChart';

const ProductCard = ({ data }) => {
    return (
        <div className="product-card">
            <img src={data.image_url} alt={data.product_title} width={200} />
            <h3>{data.product_title}</h3>
            <p>현재 가격: ₩{data.current_price}</p>

            <h3>가격 변동 그래프</h3>
            <PriceChart data={data.price_history} />
        </div>
    );
};

export default ProductCard;
