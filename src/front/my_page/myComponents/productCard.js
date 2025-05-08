import React from 'react';

const ProductCard = ({ product, onClick }) => {
    return (
        <div className="product-card" onClick={onClick}>
            <img
                src={product.image_url}
                alt={product.product_title}
                className="product-image"
            />
            <div className="product-title">
                <strong>{product.product_title}</strong>
            </div>
        </div>
    );
};

export default ProductCard;
