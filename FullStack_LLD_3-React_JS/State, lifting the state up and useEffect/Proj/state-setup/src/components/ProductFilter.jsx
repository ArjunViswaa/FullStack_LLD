import React, { useState } from "react";

const ProductFilterApp = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Example product data
  const products = [
    { id: 1, name: "Apple", category: "Fruits", price: "$1" },
    { id: 2, name: "Carrot", category: "Vegetables", price: "$0.50" },
    { id: 3, name: "Chicken", category: "Meat", price: "$5" },
    { id: 4, name: "Fish", category: "Meat", price: "$3" },
    { id: 5, name: "Banana", category: "Fruits", price: "$2" },
  ];

  const categories = ["Fruits", "Vegetables", "Meat"];

  const handleCategoryChange = (category) => {
    // Implement category selection logic
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category) // Remove if exists
        : [...prevCategories, category] // Add if not exists
    );
  };

  const filterProducts = () => {
    // Implement product filtering logic
    return products.filter((product) =>
      selectedCategories.includes(product.category)
    );
  };

  return (
    <div>
      <h1>Product Filter</h1>
      {/* Category checkboxes */}
      <div>
        {categories.map((category) => (
          <div key={category}>
            <input
              type="checkbox"
              value={category}
              onChange={() => handleCategoryChange(category)}
            />{" "}
            {category}
          </div>
        ))}
      </div>
      {/* Product list */}
      <ul>
        {filterProducts().map((product) => (
          <li key={product.id}>
            {product.name} - {product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductFilterApp;
