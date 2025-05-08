import Header from "../components/Header";
import React, { useState } from "react";
import CategoryTabs from './categoryTabs';
import ProductCard from './productCard';
import { useNavigate } from 'react-router-dom';
import { categories, favoriteProducts } from './mockData';

const My_page = () => {
    const [selectedCategory, setSelectedCategory] = useState('전체');
    const navigate = useNavigate();

    const handleClickProduct = (product) => {
        navigate('/', { state: { keyword: product.product_title } });
    };

    const filteredProducts = selectedCategory === '전체'
        ? favoriteProducts
        : favoriteProducts.filter(
            (p) => p.category_name === selectedCategory
        );

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
                        onClick={() => handleClickProduct(product)}
                    />
                ))}
            </div>
        </div>
    );
};
export default My_page;