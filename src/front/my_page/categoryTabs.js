import React from 'react';

const CategoryTabs = ({ categories, selected, onSelect }) => {
    return (
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {['전체', ...categories.map((c) => c.category_name)].map((name) => (
                <button
                    key={name}
                    onClick={() => onSelect(name)}
                    style={{
                        padding: '0.5rem 1rem',
                        background: selected === name ? '#333' : '#eee',
                        color: selected === name ? '#fff' : '#000',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    {name}
                </button>
            ))}
        </div>
    );
};

export default CategoryTabs;
