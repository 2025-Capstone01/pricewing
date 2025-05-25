import './ProductGrid.css'; // CSS는 여기서 분리

const ProductGrid = ({ products, onProductClick }) => {
    if (products.length === 0) {
        return <p>💡 현재 관심 상품이 없습니다.</p>;
    }

    return (
        <div className="product-list">
            {products.map(product => (
                <div
                    key={product.product_id}
                    className="product-card"
                    onClick={() => onProductClick(product.product_url)}
                >
                    <img
                        src={product.image_url}
                        alt={product.product_title}
                        className="product-image"
                    />
                    <div className="product-title">
                        {product.product_title}
                    </div>
                    <div className="product-price">
                        ₩{product.current_price?.toLocaleString()}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductGrid;
