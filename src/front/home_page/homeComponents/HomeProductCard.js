import React from 'react';
import styles from './HomeProductCard.module.css';
import LikeButton from './LikeButton';
import DiscountRate from './DiscountRate';
import PriceChart from './PriceChart';
import GraphDescription from './GraphDescription';
import PriceAnalysisAI from "./PriceAnalysisAI";


const HomeProductCard = ({ data }) => {
    const userId = localStorage.getItem("user_id");
    const original = Number(data.original_price);
    const current = Number(data.current_price);

    return (
        <div className={styles.card}>
            <div className={styles.top}>
                <img
                    src={data.image_url}
                    alt={data.product_title}
                    className={styles.image}
                />
                <div className={styles.productInfo}>
                    <div className={styles.titleRow}>
                        <h2 className={styles.title}>{data.product_title}</h2>
                        <LikeButton userId={userId} productId={data.product_id} />
                    </div>
                    <div className={styles.priceBlock}>
                        <p className={styles.price}>현재 가격: {current.toLocaleString()}원</p>
                        <p className={styles.original}>정가: {original.toLocaleString()}원</p>
                        <DiscountRate originalPrice={original} currentPrice={current} />
                    </div>
                </div>
            </div>

            <h3 className={styles.graphTitle}>가격 변동 그래프</h3>
            <PriceChart data={data.price_history} originalPrice={original} />
            {/* AI Summary Component */}
            <PriceAnalysisAI
                priceHistory={data.price_history}
                productTitle={data.product_title}
                originalPrice = {data.original_price}/>

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
