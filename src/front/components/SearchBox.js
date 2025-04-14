const SearchBox = ({ onSearch }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const link = e.target.link.value.trim();
        if (link) onSearch(link);
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
            <input
                type="text"
                name="link"
                placeholder="무신사 상품 링크를 붙여넣어 주세요"
                style={{ flex: 1, padding: "0.75rem", borderRadius: "8px", border: "1px solid #ccc" }}
            />
            <button type="submit" style={{ padding: "0.75rem 1rem", borderRadius: "8px", backgroundColor: "#1a73e8", color: "white", border: "none" }}>
                검색
            </button>
        </form>
    );
};

export default SearchBox;
