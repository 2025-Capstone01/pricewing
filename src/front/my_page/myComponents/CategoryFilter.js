import './CategoryFilter.css';

const CategoryFilter = ({ categories, selectedCategory, onSelect }) => {
    return (
        <div className="category-filter">
            <button
                className={`category-button ${selectedCategory === '전체' ? 'selected' : ''}`}
                onClick={() => onSelect('전체')}
            >
                전체
            </button>
            {categories.map(cat => (
                <button
                    key={cat.category_id}
                    className={`category-button ${selectedCategory === cat.category_name ? 'selected' : ''}`}
                    onClick={() => onSelect(cat.category_name)}
                >
                    {cat.category_name}
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter;
