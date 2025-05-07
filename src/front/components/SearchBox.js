import React, { useState } from 'react';

const SearchBox = ({ onSearch }) => {
    const [link, setLink] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (link.trim()) {
            onSearch(link);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="무신사 상품 링크를 입력하세요"
                value={link}
                onChange={(e) => setLink(e.target.value)}
            />
            <button type="submit">검색</button>
        </form>
    );
};

export default SearchBox;
