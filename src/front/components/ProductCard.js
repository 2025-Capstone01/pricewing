const ProductCard = ({ product }) => {
    if (!product) return null;

    return (
        <div style={{ marginBottom: "2rem" }}>
            <img src={product.image} alt={product.name} style={{ width: "300px", borderRadius: "8px" }} />
            <div style={{ marginTop: "1rem" }}>
                <h2>{product.name}</h2>
                <p>현재 가격: {product.currentPrice.toLocaleString()}원</p>
            </div>
        </div>
    );
};

export default ProductCard;