import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import SearchBox from './homeComponents/SearchBox';
import Home_ProductCard from './homeComponents/home_ProductCard';

const Home_page = () => {
    const location = useLocation();
    const [productData, setProductData] = useState(null);

    useEffect(() => {
        setProductData(null);
    }, [location.key]);

    const handleSearch = async (link) => {
        console.log("검색 시작:", link);
        try {
            const res = await fetch("http://localhost:5050/api/search", {
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
                {/* 마이페이지에서 전달된 URL(keyword)을 검색창으로 전달*/}
                <SearchBox onSearch={handleSearch} likeUrl={location.state?.keyword} key={location.key}/>

                {productData && (
                    <>
                        <Home_ProductCard data={productData} />
                    </>
                )}
            </div>
        </>
    );
};
export default Home_page;