import React, { useState } from 'react';
import Header from '../components/Header';
import useNavigationHandler from '../components/useNavigationHandler';
import useUserData from './myComponents/useUserData';
import CategoryFilter from './myComponents/CategoryFilter';
import ProductGrid from './myComponents/ProductGrid';

const MyPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('전체');
    const { goHome } = useNavigationHandler();

    const {
        userId,
        categories,
        favoriteProducts,
        loginError,
        loading
    } = useUserData();

    const filtered = selectedCategory === '전체'
        ? favoriteProducts
        : favoriteProducts.filter(p => p.category_name === selectedCategory);

    const handleProductClick = (productUrl) => {
        goHome(productUrl); // 상태로 전달
    };

    console.log("Login Error:", loginError);  // Log loginError state

    if (loginError) {
        console.error("Login Error:", loginError);  // Log the login error
        return (
            <div>
                <Header />
                <h2>⚠️ 로그인 정보가 없습니다.</h2>
                <p>로그인 후 다시 시도해주세요. 👉 <a href="/login">로그인 하기</a></p>
            </div>
        );
    }

    return (
        <div>
            <Header />
            <h2>관심 상품</h2>
            {!loading && (
                <>
                    <CategoryFilter
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onSelect={setSelectedCategory}
                    />
                    <ProductGrid
                        products={filtered}
                        onProductClick={handleProductClick}
                    />
                </>
            )}
            {loading && <p>⏳ 불러오는 중...</p>}
        </div>
    );
};

export default MyPage;