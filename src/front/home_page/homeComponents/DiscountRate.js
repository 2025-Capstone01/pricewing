import React from 'react';

const DiscountRate = ({ originalPrice, currentPrice }) => {
    if (!originalPrice || originalPrice <= currentPrice) return null;

    const rate = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);

    return (
        <p>
            할인율: {rate}% 할인 중!
        </p>
    );
};

export default DiscountRate;
