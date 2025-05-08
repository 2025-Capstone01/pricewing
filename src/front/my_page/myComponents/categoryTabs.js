import React from 'react';

// 카테고리 탭 컴포넌트: '전체' + DB에서 받아온 카테고리 목록 표시
const CategoryTabs = ({ categories, selected, onSelect }) => {
    return (
        <div className="category-tabs">
            {[
                '전체',
                ...categories.map((c) => c.category_name) // 실제 카테고리 이름만 추출
            ].map((name) => (
                <button
                    key={name}
                    onClick={() => onSelect(name)} // 클릭 시 해당 카테고리 선택
                    className={`category-button ${selected === name ? 'selected' : ''}`}
                >
                    {/* 카테고리 이름 출력 */}
                    {name}
                </button>
            ))}
        </div>
    );
};

export default CategoryTabs;
