import React, { useEffect, useState } from 'react';
import styles from './SearchBox.module.css';

const SearchBox = ({ onSearch, likeUrl }) => {
    const [link, setLink] = useState('');

    // 마이페이지 관심 상품 클릭하면 자동으로 입력값을 설정하고 검색 실행
    // 검색창에 전달받은 URL을 자동으로 채워주고
    // onSearch 함수를 호출해 자동 검색도 함께 실행함
    useEffect(() => {
        if (likeUrl) {
            setLink(likeUrl); // 입력창에 전달받은 링크 설정
            onSearch(likeUrl); // 전달받은 링크로 자동 검색 실행
        } else {
            setLink((prev) => (prev.trim() === '' ? '' : prev));             // 링크 없을 때는 검색창 비우기
        }
    }, [likeUrl, onSearch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (link.trim()) {
            onSearch(link);
        }
    };

    return (
        <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
            <input
                type="text"
                className={styles.input}
                placeholder="무신사 상품 링크를 입력하세요"
                value={link}
                onChange={(e) => setLink(e.target.value)}
            />
            <button type="submit" className={styles.button}>검색</button>
        </form>
        </div>
    );
};

export default SearchBox;
