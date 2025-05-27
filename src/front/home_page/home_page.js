import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import SearchBox from './homeComponents/SearchBox';
import HomeProductCard from './homeComponents/HomeProductCard';
import HomeDescription from './homeComponents/HomeDescription';

const Home_page = () => {
    const location = useLocation();
    const [productData, setProductData] = useState(null);
    const [likeUrl, setLikeUrl] = useState('');

    // 검색 URL이 변경되면 결과 초기화
    useEffect(() => {
        setProductData(null);
    }, [location.key]);

    // 검색 실행 함수
    const handleSearch = async (link) => {
        console.log("검색 시작:", link);
        try {
            const res = await fetch("http://0.0.0.0:5050/api/search", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ link })
            });
            const data = await res.json();
            console.log("응답 받음:", data);
            setProductData(data);
        } catch (error) {
            console.error("검색 실패:", error);
        }
    };

    return (
        <>
            <Header/>
            <div className="home-container">

                {/* 홈페이지 설명글 */}
                <HomeDescription />

                {/* 마이페이지에서 전달된 URL(keyword)을 검색창으로 전달*/}
                <SearchBox onSearch={handleSearch} likeUrl={location.state?.keyword} key={location.key}/>

                {/* 검색 결과가 있을 때만 상품 카드 렌더링 */}
                {productData && (
                    <>
                        <HomeProductCard data={productData} />
                    </>
                )}
            </div>
        </>
    );
};
export default Home_page;