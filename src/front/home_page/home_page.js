import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import SearchBox from '../components/SearchBox';
import ProductCard from '../components/ProductCard';
import { DuseLocation } from 'react-router-dom';

const Home_page = () => {
    const location = useLocation();
    const [productData, setProductData] = useState(null);

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
                <SearchBox onSearch={handleSearch} likeUrl={location.state?.keyword}/>

                {productData && (
                    <>
                        <ProductCard data={productData} />
                    </>
                )}
            </div>
        </>
    );
};
export default Home_page;