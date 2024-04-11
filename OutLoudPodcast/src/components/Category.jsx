import React, { useState } from "react";

function Category({ onSelectCategory }) {
    const [categories] = useState(['Movies', 'Sports', 'Music', 'Shows', 'Pop Culture', 'Anime'])

    const handleCategorySelect = (categories) => {
        onSelectCategory(categories)
    };

    return (
        <div className= "category">
            <h2>Categories</h2>
            <ul>
                {categories.map((category, index) => (
                    <li key={index} onClick={() => handleCategorySelect(category)}>
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Category
