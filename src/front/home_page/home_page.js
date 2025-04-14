import React, { useState } from 'react';
import useNavigationHandler from '../components/useNavigationHandler';
import SearchBox from '../components/SearchBox';
import ProductCard from '../components/ProductCard';
import PriceChart from '../components/PriceChart';

const Home_page = () => {
    const {
        goLogin,
        goMyPage,
        isLoggedIn,
        handleLogout
    } = useNavigationHandler();

    const [productData, setProductData] = useState(null);

    const handleSearch = async (link) => {
        console.log("🔍 검색 시작:", link);
        try {
            const res = await fetch("http://localhost:5050/api/search", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ link })
            });
            const data = await res.json();
            console.log("✅ 응답 받음:", data);
            setProductData(data);
        } catch (err) {
            console.error("❌ 검색 실패:", err);
        }
    };

    return (
        <>
            {/* ✅ 상단 헤더 */}
            <div style={styles.header}>
                <h2 style={styles.logo}>🛍️ 프라이스윙</h2>
                <div style={styles.rightButtons}>
                    {/* ✅ 항상 보이도록 수정됨 */}
                    <button style={styles.myBtn} onClick={goMyPage}>
                        마이페이지
                    </button>
                    <button
                        style={styles.loginBtn}
                        onClick={isLoggedIn() ? handleLogout : goLogin}
                    >
                        {isLoggedIn() ? "로그아웃" : "로그인"}
                    </button>
                </div>
            </div>

            {/* ✅ 본문 */}
            <div style={{ padding: '2rem', maxWidth: '768px', margin: '0 auto' }}>
                <SearchBox onSearch={handleSearch} />
                {productData && (
                    <>
                        <ProductCard product={productData.product} />
                        <PriceChart history={productData.priceHistory} />
                    </>
                )}
            </div>
        </>
    );
};

const styles = {
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        backgroundColor: "#fff",
        borderBottom: "1px solid #eee",
        position: "sticky",
        top: 0,
        zIndex: 1000,
    },
    logo: {
        margin: 0,
        fontSize: "1.5rem",
        fontWeight: "bold",
    },
    rightButtons: {
        display: "flex",
        gap: "0.5rem",
    },
    loginBtn: {
        backgroundColor: "#1a73e8",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        padding: "0.5rem 1rem",
        fontSize: "0.9rem",
        cursor: "pointer",
    },
    myBtn: {
        backgroundColor: "#4caf50",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        padding: "0.5rem 1rem",
        fontSize: "0.9rem",
        cursor: "pointer",
    }
};

export default Home_page;
