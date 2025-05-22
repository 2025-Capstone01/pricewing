import React, { useEffect, useState } from 'react';
import Header from '../components/Header';

const MyPage = () => {
    const [userId, setUserId] = useState(null);
    const [categories, setCategories] = useState([]);
    const [favoriteProducts, setFavoriteProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('전체');
    const [loginError, setLoginError] = useState(false);
    const [loading, setLoading] = useState(true);

    const email = localStorage.getItem('email');

    // ✅ Step 1: 이메일로 user_id 받아오기
    useEffect(() => {
        if (!email) {
            setLoginError(true);
            return;
        }

        fetch(`/api/users/id?email=${email}`)
            .then(async (res) => {
                const text = await res.text();
                console.log('🧾 Raw response:', text);
                try {
                    const json = JSON.parse(text);
                    if (json.user_id) {
                        setUserId(json.user_id);
                        setLoginError(false);
                    } else {
                        setLoginError(true);
                    }
                } catch (err) {
                    console.error("❌ JSON 파싱 오류:", err);
                    setLoginError(true);
                }
            })
            .catch(err => {
                console.error("❌ 유저 ID 불러오기 실패:", err);
                setLoginError(true);
            });
    }, [email]);

    // ✅ Step 2: user_id로 관심상품 + 카테고리 불러오기
    useEffect(() => {
        if (!userId) return;

        setLoading(true);

        Promise.all([
            fetch('/api/categories').then(res => res.json()),
            fetch(`/api/likes?user_id=${userId}`).then(res => res.json())
        ])
            .then(([cats, likes]) => {
                setCategories(cats);
                setFavoriteProducts(likes);
                console.log("✅ 관심상품:", likes);
            })
            .catch(err => console.error("❌ 데이터 불러오기 실패:", err))
            .finally(() => setLoading(false));
    }, [userId]);

    const filtered = selectedCategory === '전체'
        ? favoriteProducts
        : favoriteProducts.filter(p => p.category_name === selectedCategory);

    // ✅ 미 로그인 상황
    if (loginError) {
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

            {/* 카테고리 버튼 */}
            {loading ? (
                <p>⏳ 불러오는 중...</p>
            ) : (
                <div style={{ marginBottom: '1rem' }}>
                    <button onClick={() => setSelectedCategory('전체')}>전체</button>
                    {categories.map(cat => (
                        <button
                            key={cat.category_id}
                            onClick={() => setSelectedCategory(cat.category_name)}
                        >
                            {cat.category_name}
                        </button>
                    ))}
                </div>
            )}

            {/* 관심 상품 출력 */}
            {!loading && filtered.length > 0 ? (
                <ul>
                    {filtered.map(product => (
                        <li key={product.product_id}>
                            {product.product_title} ({product.category_name})
                        </li>
                    ))}
                </ul>
            ) : !loading && (
                <p>💡 현재 관심 상품이 없습니다.</p>
            )}
        </div>
    );
};

export default MyPage;
