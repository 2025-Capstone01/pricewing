import React, { useState } from 'react';
import CategoryTabs from './myComponents/categoryTabs';
import ProductCard from './myComponents/productCard';
import { useNavigate } from 'react-router-dom';
import { categories, favoriteProducts } from './myComponents/mockData';
import Header from "../components/Header";

const MyPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('전체');
    const navigate = useNavigate();

    const handleClickProduct = (product) => {
        navigate('/', { state: { keyword: product.product_url } });
    };

    const filteredProducts = selectedCategory === '전체'
        ? favoriteProducts
        : favoriteProducts.filter((p) => p.category_name === selectedCategory);

    return (
        <div style={{ padding: '1rem' }}>
            <Header/>
            <h2>관심 상품</h2>
            <CategoryTabs
                categories={categories}
                selected={selectedCategory}
                onSelect={setSelectedCategory}
            />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
                {filteredProducts.map((product) => (
                    <ProductCard
                        key={product.product_id}
                        product={product}
                        onClick={() => handleClickProduct(product)} // 클릭 시 홈페이지로 이동

                    />
                ))}
            </div>
        </div>
    );
};

export default MyPage;
