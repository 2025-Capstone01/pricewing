import React from 'react';
import styles from './DiscountRate.module.css';


const DiscountRate = ({ originalPrice, currentPrice }) => {
    if (!originalPrice || originalPrice <= currentPrice) return null;

    const rate = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);

    return (
        <p className={styles.rate}>
            할인율: {rate}% 할인 중!
        </p>
    );
};

export default DiscountRate;
