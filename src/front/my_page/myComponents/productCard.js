import React from 'react';

// 상품 하나를 카드 형태로 보여주는 컴포넌트
const ProductCard = ({ product, onClick }) => {
    return (
        // 카드 전체를 클릭하면 onClick 이벤트 실행 (예: 검색 이동)
        <div className="product-card" onClick={onClick}>
            {/* 상품 이미지 */}
            <img
                src={product.image_url}
                alt={product.product_title}
                className="product-image"
            />
            {/* 상품명 */}
            <div className="product-title">
                <strong>{product.product_title}</strong>
            </div>
        </div>
    );
};

export default ProductCard;
