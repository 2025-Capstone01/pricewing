import React from 'react';

const ProductCard = ({ product, onClick }) => {
    return (
        <div
            onClick={onClick}
            style={{
                width: '180px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '0.5rem',
                cursor: 'pointer',
            }}
        >
            <img
                src={product.image_url}
                alt={product.product_title}
                style={{ width: '100%', borderRadius: '4px' }}
            />
            <div style={{ marginTop: '0.5rem' }}>
                <strong>{product.product_title}</strong>
            </div>
        </div>
    );
};

export default ProductCard;
