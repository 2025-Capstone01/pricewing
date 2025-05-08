import React, { useState } from 'react';
import CategoryTabs from './myComponents/categoryTabs'; // 카테고리 필터 탭 컴포넌트
import ProductCard from './myComponents/productCard'; // 상품 카드 컴포넌트
import { useNavigate } from 'react-router-dom';
import { categories, favoriteProducts } from './myComponents/mockData'; // 임시 목데이터 (백엔드 연결 전)
import Header from "../components/Header"; // 상단 헤더

const MyPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('전체'); // 선택된 카테고리 상태
    const navigate = useNavigate();

    // 상품 카드 클릭 시 → 홈으로 이동 + 상품 URL 전달
    const handleClickProduct = (product) => {
        navigate('/', { state: { keyword: product.product_url } });
    };

    // 현재 선택된 카테고리에 따라 상품 필터링
    const filteredProducts = selectedCategory === '전체'
        ? favoriteProducts
        : favoriteProducts.filter((p) => p.category_name === selectedCategory);

    return (
        <div style={{ padding: '1rem' }}>
            <Header/> {/* 상단 헤더 */}
            <h2>관심 상품</h2>

            {/* 카테고리 선택 탭 */}
            <CategoryTabs
                categories={categories}
                selected={selectedCategory}
                onSelect={setSelectedCategory}
            />

            {/* 필터링된 상품 목록 */}
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
