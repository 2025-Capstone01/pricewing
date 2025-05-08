import React from 'react';

const CategoryTabs = ({ categories, selected, onSelect }) => {
    return (
        <div className="category-tabs">
            {['전체', ...categories.map((c) => c.category_name)].map((name) => (
                <button
                    key={name}
                    onClick={() => onSelect(name)}
                    className={`category-button ${selected === name ? 'selected' : ''}`}
                >
                    {name}
                </button>
            ))}
        </div>
    );
};

export default CategoryTabs;
